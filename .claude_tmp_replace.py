from pathlib import Path
p = Path('assets/js/app.js')
s = p.read_text(encoding='utf-8')
start = s.index('    async loadSellers')
end = s.index('    async loadPestControl')
new = r'''    contactSearchHtml(type, count, districtName) {
        const label = type === 'seller' ? 'sellers, crops, phone or address' : 'buyers, crops, phone or address';
        return `
            <section class="trade-hero trade-hero-${type}">
                <div>
                    <span class="trade-kicker">${districtName}</span>
                    <h2>${type === 'seller' ? this.texts[this.currentLang].find_sellers : this.texts[this.currentLang].find_buyers}</h2>
                    <p>${count} ${type === 'seller' ? 'seller' : 'buyer'}${count === 1 ? '' : 's'} found. Filter the list, then call directly.</p>
                </div>
            </section>
            <label class="trade-filter">
                <span class="material-symbols-rounded">search</span>
                <input type="search" data-contact-filter placeholder="Filter ${label}" aria-label="Filter ${label}">
            </label>
            <p class="trade-filter-count" data-contact-count>${count} showing</p>
        `;
    }

    bindContactFilter() {
        const input = document.querySelector('[data-contact-filter]');
        const count = document.querySelector('[data-contact-count]');
        const cards = Array.from(document.querySelectorAll('[data-contact-card]'));
        if (!input || !count || cards.length === 0) return;

        input.addEventListener('input', () => {
            const term = input.value.toLowerCase().trim();
            let visible = 0;
            cards.forEach(card => {
                const matches = card.dataset.search.includes(term);
                card.hidden = !matches;
                if (matches) visible++;
            });
            count.textContent = term ? `${visible} match${visible === 1 ? '' : 'es'}` : `${cards.length} showing`;
        });
    }

    async loadSellers(districtId, specificCrop = null) {
        try {
            let endpoint = `api.php?action=sellers&district_id=${districtId}`;
            if (specificCrop) {
                endpoint += `&crop=${encodeURIComponent(specificCrop)}`;
            }

            const response = await this.apiCall(endpoint);

            if (!response.success) {
                this.showError(response.error || 'Failed to load sellers');
                return;
            }

            const sellers = response.data || [];

            if (sellers.length === 0) {
                this.showNoData();
                return;
            }

            const districtName = sellers[0]?.district_name || 'Selected district';
            const html = `
                ${this.contactSearchHtml('seller', sellers.length, districtName)}
                <div class="trade-list">
                    ${sellers.map(seller => {
                        const crops = seller.crops_display || 'Crops not listed';
                        const rating = seller.rating ? `${seller.rating}/5 rating` : 'New contact';
                        const search = `${seller.name} ${seller.district_name} ${seller.phone_number || ''} ${seller.email || ''} ${seller.address || ''} ${crops}`.toLowerCase();
                        return `
                            <article class="trade-card seller-card" data-contact-card data-search="${search}">
                                <div class="trade-card-marker" aria-hidden="true"></div>
                                <div class="trade-card-main">
                                    <div class="trade-card-title">
                                        <h3>${seller.name}</h3>
                                        <span>${rating}</span>
                                    </div>
                                    <p class="trade-location">${seller.district_name}${seller.address ? ` · ${seller.address}` : ''}</p>
                                    <p class="trade-crops"><strong>Sells:</strong> ${crops}</p>
                                </div>
                                <div class="trade-actions">
                                    <a href="tel:${seller.phone_number}" class="trade-call">Call ${seller.phone_number}</a>
                                    ${seller.email ? `<a href="mailto:${seller.email}" class="trade-email">Email</a>` : ''}
                                </div>
                            </article>
                        `;
                    }).join('')}
                </div>
            `;

            document.getElementById('content-area').innerHTML = html;
            this.bindContactFilter();

        } catch (error) {
            console.error('❌ Error loading sellers:', error);
            this.showError('Failed to load sellers');
        }
    }

    async loadBuyers(districtId) {
        try {
            const response = await this.apiCall('api.php?action=buyers&district_id=' + districtId);

            if (!response.success) {
                this.showError(response.error || 'Failed to load buyers');
                return;
            }

            const buyers = response.data || [];

            if (buyers.length === 0) {
                this.showNoData();
                return;
            }

            const districtName = buyers[0]?.district_name || 'Selected district';
            const html = `
                ${this.contactSearchHtml('buyer', buyers.length, districtName)}
                <div class="trade-list">
                    ${buyers.map(buyer => {
                        const crops = buyer.crops_display || 'Crops not listed';
                        const search = `${buyer.name} ${buyer.district_name} ${buyer.phone_number || ''} ${buyer.email || ''} ${buyer.address || ''} ${crops}`.toLowerCase();
                        return `
                            <article class="trade-card buyer-card" data-contact-card data-search="${search}">
                                <div class="trade-card-marker" aria-hidden="true"></div>
                                <div class="trade-card-main">
                                    <div class="trade-card-title">
                                        <h3>${buyer.name}</h3>
                                        <span>Buying now</span>
                                    </div>
                                    <p class="trade-location">${buyer.district_name}${buyer.address ? ` · ${buyer.address}` : ''}</p>
                                    <p class="trade-crops"><strong>Buys:</strong> ${crops}</p>
                                </div>
                                <div class="trade-actions">
                                    <a href="tel:${buyer.phone_number}" class="trade-call">Call ${buyer.phone_number}</a>
                                    ${buyer.email ? `<a href="mailto:${buyer.email}" class="trade-email">Email</a>` : ''}
                                </div>
                            </article>
                        `;
                    }).join('')}
                </div>
            `;

            document.getElementById('content-area').innerHTML = html;
            this.bindContactFilter();

        } catch (error) {
            console.error('❌ Error loading buyers:', error);
            this.showError('Failed to load buyers');
        }
    }

'''
p.write_text(s[:start] + new + s[end:], encoding='utf-8')
