/*
 * sortable-table.js — Excel-style click-to-sort for any <table class="sortable">.
 *
 * Behaviour:
 *   - Click a column header to sort by that column; click again to reverse.
 *   - Numeric columns (prices, counts) sort numerically; everything else sorts
 *     as text (natural order, so "Crop 2" < "Crop 10").
 *   - A cell may override its sort key with a data-sort-value attribute — used
 *     for columns whose visible text is decorated (e.g. "MK 42,500" or a
 *     formatted date) or spans multiple lines.
 *   - Headers marked data-no-sort (e.g. an Actions column) are skipped.
 *   - Rows that do not span every column (colspan filler / "no results" rows)
 *     are left pinned at the bottom.
 *
 * Works with server-rendered tables and tables the SPA injects later, because
 * it uses a single delegated click listener on the document.
 */
(function () {
    'use strict';

    // Inject styling once so every including page gets the sort affordance.
    if (!document.getElementById('sortable-table-styles')) {
        var css = document.createElement('style');
        css.id = 'sortable-table-styles';
        css.textContent =
            'table.sortable th{cursor:pointer;user-select:none;white-space:nowrap;position:relative}' +
            'table.sortable th[data-no-sort]{cursor:default}' +
            'table.sortable th:not([data-no-sort])::after{content:"\\2195";opacity:.35;margin-left:.4em;font-size:.85em;font-weight:400}' +
            'table.sortable th[aria-sort="ascending"]::after{content:"\\2191";opacity:1}' +
            'table.sortable th[aria-sort="descending"]::after{content:"\\2193";opacity:1}' +
            'table.sortable th:not([data-no-sort]):hover{filter:brightness(1.15)}';
        (document.head || document.documentElement).appendChild(css);
    }

    function sortKey(row, index) {
        var cell = row.children[index];
        if (!cell) return '';
        if (cell.dataset && cell.dataset.sortValue !== undefined) return cell.dataset.sortValue;
        return (cell.textContent || '').trim();
    }

    function toNumber(value) {
        if (value === '' || value === '—' || value == null) return null;
        var n = parseFloat(String(value).replace(/[^0-9.\-]/g, ''));
        return isNaN(n) ? null : n;
    }

    function sortTable(table, index, th) {
        var headerCells = th.parentNode.children;
        var headerCount = headerCells.length;
        var tbody = table.tBodies[0];
        if (!tbody) return;

        var sortable = [], pinned = [];
        Array.prototype.forEach.call(tbody.rows, function (row) {
            if (row.children.length === headerCount && !row.hasAttribute('data-no-sort')) sortable.push(row);
            else pinned.push(row);
        });

        var dir = th.getAttribute('aria-sort') === 'ascending' ? 'descending' : 'ascending';
        Array.prototype.forEach.call(headerCells, function (h) { h.removeAttribute('aria-sort'); });
        th.setAttribute('aria-sort', dir);
        var factor = dir === 'ascending' ? 1 : -1;

        var numeric = sortable.length > 0 && sortable.every(function (row) {
            var v = sortKey(row, index);
            return v === '' || v === '—' || toNumber(v) !== null;
        });

        sortable.sort(function (a, b) {
            var va = sortKey(a, index), vb = sortKey(b, index);
            if (numeric) {
                var na = toNumber(va), nb = toNumber(vb);
                if (na === null) na = -Infinity;
                if (nb === null) nb = -Infinity;
                return (na - nb) * factor;
            }
            return va.localeCompare(vb, undefined, { numeric: true, sensitivity: 'base' }) * factor;
        });

        sortable.forEach(function (row) { tbody.appendChild(row); });
        pinned.forEach(function (row) { tbody.appendChild(row); });
    }

    document.addEventListener('click', function (e) {
        var th = e.target.closest && e.target.closest('th');
        if (!th || th.hasAttribute('data-no-sort')) return;
        var table = th.closest('table');
        if (!table || !table.classList.contains('sortable')) return;
        var index = Array.prototype.indexOf.call(th.parentNode.children, th);
        if (index < 0) return;
        sortTable(table, index, th);
    });
})();
