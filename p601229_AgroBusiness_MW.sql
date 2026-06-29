-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 16, 2026 at 09:57 AM
-- Server version: 8.0.44-cll-lve
-- PHP Version: 8.4.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `p601229_AgroBusiness_MW`
--

-- --------------------------------------------------------

--
-- Table structure for table `basic_farming_info`
--

CREATE TABLE `basic_farming_info` (
  `id` int NOT NULL,
  `topic` varchar(255) NOT NULL,
  `info_en` text NOT NULL,
  `info_ci` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `basic_farming_info`
--

INSERT INTO `basic_farming_info` (`id`, `topic`, `info_en`, `info_ci`) VALUES
(1, 'Soil Preparation', 'Till soil to 30cm depth before planting.', 'Limbani nthaka mpaka 30cm kuya musanabzale.'),
(2, 'Irrigation', 'Water crops early morning or late afternoon.', 'Thirirani mbewu mmawa kapena madzulo.'),
(3, 'Fertilizer Use', 'Apply NPK during planting', 'Gwiritsani NPK panthawi yobzala'),
(4, 'Seed Selection', 'Use certified seeds from MSC', 'Gwiritsani mbeu zovomerezeka kwa MSC'),
(5, 'Crop Rotation', 'Rotate legumes and cereals', 'Sinthanitsani nyemba ndi zingwe'),
(6, 'Post-Harvest', 'Dry to 13% moisture content', 'Pukutani kufikira 13% m\"madzi');

-- --------------------------------------------------------

--
-- Table structure for table `buyers`
--

CREATE TABLE `buyers` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `district_id` int NOT NULL,
  `contact_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `buyers`
--

INSERT INTO `buyers` (`id`, `name`, `district_id`, `contact_id`) VALUES
(1, 'John Mbewe', 1, 1),
(2, 'Jane Phiri', 2, 2),
(3, 'Alice Mwale', 3, 3),
(4, 'Bob Jere', 4, 4),
(5, 'Mzulu Wembe', 5, 5),
(6, 'Temwani Banda', 11, 6),
(7, 'Chisomo Nkhoma', 13, 7),
(8, 'Taonane Kaunda', 16, 8),
(9, 'Fatsani Gondwe', 19, 9),
(10, 'Dalitso Tembo', 24, 10),
(11, 'Mphatso Chibwe', 27, 11),
(12, 'Tione Moyo', 15, 12),
(13, 'Chikondi Msowoya', 8, 13),
(14, 'Wongani Zulu', 18, 14),
(15, 'Madalitso Kamanga', 22, 15);

-- --------------------------------------------------------

--
-- Table structure for table `buyer_contact_details`
--

CREATE TABLE `buyer_contact_details` (
  `id` int NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `buyer_contact_details`
--

INSERT INTO `buyer_contact_details` (`id`, `phone_number`, `email`, `address`) VALUES
(1, '+123456789', 'john@example.com', '123 Farm Rd'),
(2, '+987654321', 'jane@example.com', '456 Market St'),
(3, '+1122334455', 'alice@example.com', '789 Buyer Ln'),
(4, '+9988776655', 'bob@example.com', '321 Purchase Ave'),
(5, '+265 881 234567', 'mzuluwembe@agro.mw', 'Mzimba Rd, Area 3'),
(6, '+265 992 345678', 'temwanani@agro.mw', 'Chileka Rd, Limbe'),
(7, '+265 993 456789', 'chisomo@agro.mw', 'Mzuzu Highway'),
(8, '+265 888 112233', 'taonane@agro.mw', 'M1 Road, Salima'),
(9, '+265 999 223344', 'fatsani@agro.mw', 'Jenda Trading Centre'),
(10, '+265 887 334455', 'dalitso@agro.mw', 'Dedza Mountain View'),
(11, '+265 996 445566', 'mphatso@agro.mw', 'Kasungu Main Market'),
(12, '+265 885 556677', 'tione@agro.mw', 'Nkhata Bay Beach Rd'),
(13, '+265 994 667788', 'chikondi@agro.mw', 'Rumphi Boma'),
(14, '+265 882 778899', 'wongani@agro.mw', 'Karonga Lakeshore'),
(15, '+265 991 889900', 'madalitso@agro.mw', 'Thyolo Tea Estate'),
(16, '+265 880 990011', 'limbani@agro.mw', 'Chitipa Border Post'),
(17, '+265 881 234567', 'mzuluwembe@agro.mw', 'Mzimba Rd, Area 3'),
(18, '+265 992 345678', 'temwanani@agro.mw', 'Chileka Rd, Limbe'),
(19, '+265 993 456789', 'chisomo@agro.mw', 'Mzuzu Highway'),
(20, '+265 888 112233', 'taonane@agro.mw', 'M1 Road, Salima'),
(21, '+265 999 223344', 'fatsani@agro.mw', 'Jenda Trading Centre'),
(22, '+265 887 334455', 'dalitso@agro.mw', 'Dedza Mountain View'),
(23, '+265 996 445566', 'mphatso@agro.mw', 'Kasungu Main Market');

-- --------------------------------------------------------

--
-- Table structure for table `buyer_crops`
--

CREATE TABLE `buyer_crops` (
  `buyer_id` int NOT NULL,
  `crop_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `buyer_crops`
--

INSERT INTO `buyer_crops` (`buyer_id`, `crop_id`) VALUES
(1, 1),
(4, 1),
(5, 1),
(8, 1),
(2, 2),
(4, 2),
(7, 2),
(1, 3),
(2, 3),
(3, 3),
(6, 3),
(8, 3);

-- --------------------------------------------------------

--
-- Table structure for table `community_qa`
--

CREATE TABLE `community_qa` (
  `id` int NOT NULL,
  `district_id` int NOT NULL,
  `question_en` text NOT NULL,
  `question_ci` text NOT NULL,
  `answer_en` text,
  `answer_ci` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `crops`
--

CREATE TABLE `crops` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `crops`
--

INSERT INTO `crops` (`id`, `name`) VALUES
(9, 'Beans'),
(8, 'Coffee'),
(6, 'Cotton'),
(3, 'Groundnuts'),
(1, 'Maize'),
(5, 'Rice'),
(4, 'Soybeans'),
(7, 'Tea'),
(2, 'Tobacco');

-- --------------------------------------------------------

--
-- Table structure for table `crop_prices`
--

CREATE TABLE `crop_prices` (
  `id` int NOT NULL,
  `crop_id` int NOT NULL,
  `min_price` decimal(10,2) NOT NULL,
  `market_price` decimal(10,2) NOT NULL,
  `unit` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `crop_prices`
--

INSERT INTO `crop_prices` (`id`, `crop_id`, `min_price`, `market_price`, `unit`) VALUES
(1, 1, 450.00, 1500.00, 'kg'),
(2, 2, 1200.00, 1500.00, 'kg'),
(3, 3, 600.00, 700.00, 'kg'),
(4, 4, 900.00, 95.00, 'kg'),
(5, 5, 1200.00, 1400.00, 'kg'),
(6, 6, 500.00, 650.00, 'kg'),
(7, 7, 3000.00, 3500.00, 'kg'),
(8, 8, 4000.00, 4500.00, 'kg'),
(9, 9, 700.00, 850.00, 'kg');

-- --------------------------------------------------------

--
-- Table structure for table `districts`
--

CREATE TABLE `districts` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `districts`
--

INSERT INTO `districts` (`id`, `name`) VALUES
(18, 'Balaka'),
(2, 'Blantyre'),
(14, 'Chikwawa'),
(25, 'Chiradzulu'),
(12, 'Chitipa'),
(6, 'Dedza'),
(22, 'Dowa'),
(10, 'Karonga'),
(7, 'Kasungu'),
(23, 'Likoma'),
(1, 'Lilongwe'),
(20, 'Machinga'),
(13, 'Mangochi'),
(4, 'Mchinji'),
(19, 'Mulanje'),
(26, 'Mwanza'),
(27, 'Mzimba'),
(3, 'Mzuzu'),
(28, 'Neno'),
(8, 'Nkhata Bay'),
(16, 'Nkhotakota'),
(29, 'Nsanje'),
(17, 'Ntcheu'),
(5, 'Ntchisi'),
(21, 'Phalombe'),
(9, 'Rumphi'),
(24, 'Salima'),
(11, 'Thyolo'),
(15, 'Zomba');

-- --------------------------------------------------------

--
-- Table structure for table `farming_best_practices`
--

CREATE TABLE `farming_best_practices` (
  `id` int NOT NULL,
  `crop_id` int NOT NULL,
  `practice_type` varchar(255) NOT NULL,
  `practice_en` text NOT NULL,
  `practice_ci` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `farming_best_practices`
--

INSERT INTO `farming_best_practices` (`id`, `crop_id`, `practice_type`, `practice_en`, `practice_ci`) VALUES
(1, 1, 'Land Preparation', 'Prepare a fine seedbed on contour ridges before the first effective rains; incorporate well-rotted manure or compost and keep crop residues as mulch where termites are not a problem.', 'Konzani munda ndi mizere yotsatira mapiri mvula yoyamba isanagwe bwino; sakanizani manyowa okhwima kapena kompositi ndipo siyani zotsalira za mbewu ngati mulch ngati chiswe sichili vuto.'),
(2, 1, 'Planting', 'Plant clean maize seed at 75cm between rows and 25cm between stations, one seed per station, then gap-fill within 10 days after emergence.', 'Bzalani mbewu ya chimanga yabwino pa 75cm pakati pa mizere ndi 25cm pakati pa mabowo, mbewu imodzi pa bowo, ndipo bwezerani pomwe sizinamera pasanathe masiku 10.'),
(3, 1, 'Soil Fertility', 'Apply basal fertilizer or manure at planting and top-dress with nitrogen when maize is knee-high; split top-dressing if rains are heavy to reduce leaching.', 'Ikani feteleza woyambira kapena manyowa pobzala ndipo onjezerani nayitrojeni chimanga chikafika pa bondo; gawani top dressing ngati mvula ndi yambiri kuti isachoke m_nthaka.'),
(4, 1, 'Water Management', 'Conserve moisture with timely weeding, tied ridges in dry areas, and drainage channels in waterlogged fields.', 'Sungani chinyezi ndi kupalira pa nthawi yake, kupanga mizere yotsekera madzi kumadera ouma, ndi ngalande zotulutsa madzi kuminda yonyowa kwambiri.'),
(5, 1, 'Harvesting and Storage', 'Harvest when husks are dry and grain is hard, dry cobs thoroughly, shell cleanly, and store grain in hermetic bags to prevent weevils and mould.', 'Kololani makoko akauma ndipo njere zikakhala zolimba, yanikani makoko bwino, sulani mwaukhondo, ndipo sungani mu matumba osalowa mpweya kuti mupewe nyongolotsi ndi nkhungu.'),
(6, 2, 'Nursery Management', 'Raise tobacco seedlings on clean raised beds with sterilized soil, reliable water, and light shade; harden seedlings before transplanting.', 'Kwezani mbande za fodya pa mabedi okwezeka a nthaka yoyera, madzi okwanira, ndi mthunzi wochepa; zolowetsani ku dzuwa pang_ono musanazibzale.'),
(7, 2, 'Transplanting', 'Transplant vigorous seedlings after good rains into moist soil, keeping uniform spacing and replacing weak plants within the first week.', 'Bzalani mbande zamphamvu mvula ikagwa bwino m_nthaka yonyowa, sungani mtunda wofanana ndipo bwezerani zofooka mkati mwa sabata yoyamba.'),
(8, 2, 'Nutrient Management', 'Use soil-test guidance where available; avoid excess nitrogen late in the season because it reduces leaf quality and curing performance.', 'Gwiritsani malangizo a kuyezetsa nthaka ngati alipo; pewani nayitrojeni wambiri kumapeto kwa nyengo chifukwa umachepetsa khalidwe la masamba ndi kuyanika kwake.'),
(9, 2, 'Curing', 'Harvest leaves by maturity stage and cure slowly with good air movement to keep colour, aroma, and leaf body.', 'Kololani masamba malinga ndi kukhwima kwake ndipo yanikani pang_ono ndi mpweya wabwino kuti musunge mtundu, fungo, ndi mphamvu ya tsamba.'),
(10, 2, 'Rotation', 'Rotate tobacco with legumes or cereals and keep a break from tobacco-family crops to reduce nematodes, bacterial wilt, and soil fatigue.', 'Sinthanitsani fodya ndi nyemba kapena chimanga ndipo musabwereze mbewu za banja la fodya pafupi kuti muchepetse nematodes, wilt, ndi kutopa kwa nthaka.'),
(11, 3, 'Land Preparation', 'Plant groundnuts on well-drained sandy loam; make ridges early and avoid compacted or waterlogged soils that cause poor pegging.', 'Bzalani nthowa m_nthaka ya mchenga yosunga koma kutulutsa madzi bwino; pangani mizere msanga ndipo pewani nthaka yolimba kapena yodzaza madzi yomwe imalepheretsa mapegi.'),
(12, 3, 'Seed Selection', 'Use mature, undamaged seed treated with recommended inoculant or dressing where available; do not plant shrivelled or mouldy kernels.', 'Gwiritsani mbewu zokhwima komanso zosawonongeka, zokutidwa ndi inoculant kapena mankhwala ovomerezeka ngati alipo; musabzale nthowa zofota kapena za nkhungu.'),
(13, 3, 'Weeding', 'Weed early and shallow before flowering, then avoid disturbing pegs once pods start forming.', 'Palirani msanga komanso mozama pang_ono musanayambe maluwa, kenako pewani kusokoneza mapegi akayamba kupanga makoko.'),
(14, 3, 'Harvesting', 'Lift plants when inner shells show dark veining and most pods are filled; dry on racks or clean mats to protect quality.', 'Kololani zomera pamene mkati mwa makoko muli mizere yakuda ndipo makoko ambiri adzaza; yanikani pa nsanja kapena mphasa zoyera kuti khalidwe lisawonongeke.'),
(15, 3, 'Aflatoxin Prevention', 'Dry pods quickly to safe moisture, sort out damaged kernels, and store off the floor in a dry ventilated room.', 'Yanikani makoko mwachangu mpaka chinyezi chitetezeka, sankhani ndi kuchotsa zosweka, ndipo sungani pamwamba osati pansi m_chipinda chowuma chokhala ndi mpweya.'),
(16, 4, 'Inoculation', 'Inoculate soybean seed with the correct rhizobium if the field has not grown soybeans recently; plant immediately after inoculation.', 'Sakanizani mbewu ya soya ndi rhizobium yoyenera ngati mundawo sunalimidwe soya posachedwa; bzalanipo nthawi yomweyo mukatha kusakaniza.'),
(17, 4, 'Planting', 'Plant soybeans in moist, well-drained loam at uniform depth and spacing to close the canopy quickly and suppress weeds.', 'Bzalani soya m_nthaka yonyowa koma yotulutsa madzi bwino pa kuya ndi mtunda wofanana kuti masamba atseke msanga ndi kuchepetsa udzu.'),
(18, 4, 'Weed Control', 'Keep the field weed-free for the first 6 weeks; late weeding after flowering can damage roots and pods.', 'Sungani munda wopanda udzu kwa masabata 6 oyambirira; kupalira mochedwa maluwa atayamba kungawononge mizu ndi makoko.'),
(19, 4, 'Harvesting', 'Harvest when most pods are brown and seeds rattle, then dry and thresh gently to avoid splitting grain.', 'Kololani makoko ambiri akakhala bulauni ndipo mbewu zikamveka kugunda, kenako yanikani ndi kupuntha mosamala kuti zisagawike.'),
(20, 4, 'Storage', 'Store dry soybeans in clean bags on pallets and monitor for moisture migration during cool nights.', 'Sungani soya wouma mu matumba oyera pamapallet ndipo yang_anirani chinyezi makamaka usiku wozizira.'),
(21, 5, 'Nursery and Transplanting', 'Use healthy rice seedlings 18-25 days old; transplant 2-3 seedlings per hill in straight lines for easier weeding and water control.', 'Gwiritsani mbande za mpunga zathanzi za masiku 18-25; bzalani mbande 2-3 pa malo m_mizere yolunjika kuti kupalira ndi kusamalira madzi zikhale zosavuta.'),
(22, 5, 'Water Management', 'Keep shallow water during establishment, drain briefly for weeding and tillering, then avoid deep stagnant water except where needed for weed suppression.', 'Sungani madzi ochepa poyamba, tulutsani pang_ono popalira ndi kulimbikitsa nthambi, ndipo pewani madzi akuya osayenda kupatula ngati akufunika kuchepetsa udzu.'),
(23, 5, 'Fertility', 'Apply nitrogen in splits and include organic matter; yellowing after flooding often signals nitrogen loss.', 'Ikani nayitrojeni mogawagawana ndipo onjezani zinthu zachilengedwe; kusanduka chikasu pambuyo pa madzi ambiri nthawi zambiri kumasonyeza kutayika kwa nayitrojeni.'),
(24, 5, 'Harvesting', 'Harvest rice when 80-85% of grains are straw-coloured, then dry paddy to about 14% moisture before milling.', 'Kololani mpunga pamene 80-85% ya njere zasanduka mtundu wa udzu, kenako yanikani mpaka chinyezi cha pafupifupi 14% musanagaye.'),
(25, 5, 'Postharvest', 'Thresh on clean surfaces, winnow carefully, and store paddy away from moisture, rodents, and poultry.', 'Punthani pa malo oyera, pepetani mosamala, ndipo sungani mpunga kutali ndi chinyezi, mbewa, ndi nkhuku.'),
(26, 6, 'Planting', 'Plant cotton after reliable rains in warm soil; use recommended spacing and avoid late planting that exposes bolls to peak pests.', 'Bzalani kotoni mvula ikakhazikika m_nthaka yotentha; gwiritsani mtunda wovomerezeka ndipo pewani kubzala mochedwa komwe kumawonjezera tizilombo pa mabola.'),
(27, 6, 'Canopy Management', 'Thin weak plants early and keep rows open enough for scouting, spraying, and air movement.', 'Chepetsani zomera zofooka msanga ndipo sungani mizere yotseguka kuti kuyendera, kupopera, ndi mpweya ziziyenda bwino.'),
(28, 6, 'Nutrient Management', 'Balance nitrogen with potassium and organic matter; too much nitrogen delays boll opening and attracts sucking pests.', 'Yanjanitsani nayitrojeni ndi potaziyamu komanso manyowa; nayitrojeni wambiri umachedwetsa kutseguka kwa mabola ndi kukopa tizilombo toyamwa.'),
(29, 6, 'Picking', 'Pick only fully opened clean bolls, keep cotton off the soil, and separate stained or pest-damaged lint.', 'Kololani mabola otseguka bwino komanso oyera, musayike kotoni pansi, ndipo patulani yomwe yadetsedwa kapena yawonongeka ndi tizilombo.'),
(30, 6, 'Residue Management', 'Destroy stalks after final picking to break bollworm and stainer life cycles.', 'Wonongani zitsinde mukamaliza kukolola kuti mudule moyo wa bollworm ndi tizilombo todetsa kotoni.'),
(31, 7, 'Pruning', 'Prune tea to maintain a broad plucking table and remove dead wood; time pruning to avoid long dry spells.', 'Dulirani tiyi kuti pamwamba pa kukolola pakhale patambalala ndipo chotsani nthambi zakufa; chitani izi osati nthawi ya chilala chotalika.'),
(32, 7, 'Plucking', 'Pluck two leaves and a bud at regular intervals; coarse plucking lowers made-tea quality.', 'Kololani masamba awiri ndi nsonga nthawi zonse; kukolola masamba akuluakulu kumachepetsa khalidwe la tiyi.'),
(33, 7, 'Soil Cover', 'Maintain mulch and contour drains on slopes to reduce erosion and conserve moisture.', 'Sungani mulch ndi ngalande zotsatira mapiri kuti muchepetse kukokoloka kwa nthaka ndi kusunga chinyezi.'),
(34, 7, 'Fertility', 'Apply fertilizer after rainfall when bushes are actively growing and keep it away from stems to avoid scorch.', 'Ikani feteleza mvula ikagwa pamene tiyi ukukula bwino ndipo musayiyike pafupi ndi tsinde kuti isawotche.'),
(35, 7, 'Quality Handling', 'Keep plucked leaf shaded, loose, and delivered quickly to prevent heating and fermentation before processing.', 'Sungani masamba okolola pa mthunzi, osakanikizana kwambiri, ndipo aperekedwe mwachangu kuti asatenthe kapena kufementa asanapangidwe.'),
(36, 8, 'Shade Management', 'Maintain balanced shade in coffee: enough to reduce heat stress, but open enough for airflow and flowering.', 'Sungani mthunzi woyenera pa kofi: wokwanira kuchepetsa kutentha koma wotseguka kuti mpweya ndi maluwa ziyende bwino.'),
(37, 8, 'Pruning', 'Remove suckers, dead wood, and crossing branches after harvest to keep a productive open frame.', 'Chotsani nthambi zophukira pansi, zakufa, ndi zopingasa mukatha kukolola kuti mtengo ukhale wotseguka ndi wobala bwino.'),
(38, 8, 'Nutrition', 'Feed coffee with compost plus balanced fertilizer at the start of rains and during berry development.', 'Dyetsani kofi ndi kompositi kuphatikiza feteleza woyenera koyambirira kwa mvula ndi nthawi imene zipatso zikukula.'),
(39, 8, 'Harvesting', 'Pick only ripe red cherries in rounds; mixing green, black, and red cherries reduces cup quality.', 'Kololani zipatso zofiira zokha mobwerezabwereza; kusakaniza zobiriwira, zakuda, ndi zofiira kumachepetsa khalidwe la kofi.'),
(40, 8, 'Processing', 'Pulp the same day, ferment only until mucilage loosens, wash clean, and dry slowly on raised beds.', 'Pangani pulping tsiku lomwelo, fermentani mpaka mucilage itamasuka, sambani bwino, ndipo yanikani pang_ono pa mabedi okwezeka.'),
(41, 9, 'Planting', 'Plant beans in well-drained soil after the first good rains; avoid fields with recent bean root rot or heavy waterlogging.', 'Bzalani nyemba m_nthaka yotulutsa madzi bwino mvula yabwino yoyamba ikagwa; pewani minda yomwe yakhala ndi matenda a mizu kapena madzi ambiri.'),
(42, 9, 'Seed Health', 'Use clean seed and dress or inoculate where recommended; do not recycle seed from diseased plants.', 'Gwiritsani mbewu yoyera ndipo ikani mankhwala kapena inoculant ngati zikulimbikitsidwa; musagwiritse mbewu kuchokera ku zomera zodwala.'),
(43, 9, 'Moisture Management', 'Beans need moisture at flowering and pod fill; mulch lightly and avoid overhead irrigation late in the day to reduce leaf diseases.', 'Nyemba zimafuna chinyezi pa maluwa ndi kudzaza makoko; ikani mulch pang_ono ndipo pewani kuthirira pamwamba mochedwa kuti muchepetse matenda a masamba.'),
(44, 9, 'Harvesting', 'Harvest when pods are dry but before shattering, then dry on tarpaulins or raised mats.', 'Kololani makoko akauma koma asanaphwanye, kenako yanikani pa matenti kapena mphasa zokwezeka.'),
(45, 9, 'Storage', 'Dry beans thoroughly, sort out damaged seed, and store in hermetic bags or clean sealed containers.', 'Yanikani nyemba bwino, chotsani zowonongeka, ndipo sungani mu matumba osalowa mpweya kapena ziwiya zoyera zotsekedwa.');

-- --------------------------------------------------------

--
-- Table structure for table `market_insights`
--

CREATE TABLE `market_insights` (
  `id` int NOT NULL,
  `district_id` int NOT NULL,
  `insight_en` text NOT NULL,
  `insight_ci` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `market_insights`
--

INSERT INTO `market_insights` (`id`, `district_id`, `insight_en`, `insight_ci`) VALUES
(1, 1, 'Lilongwe maize demand is high due to urban population growth', 'Chimanga chikufunika kwambiri mu Lilongwe chifukwa cha anthu ambiri'),
(2, 2, 'Blantyre tobacco prices are stable with good export demand', 'Mitengo ya fodya mu Blantyre ndi yokhazikika ndi kufunika kwa ogulitsa kunja'),
(3, 3, 'Mzuzu groundnut supply low after heavy rains damaged crops', 'Nthola zikuchepa mu Mzuzu chifukwa chamvula zambiri'),
(4, 4, 'Mchinji new maize storage facilities opening next month', 'Mabokosi atsopano a chimanga mu Mchinji azatsegulidwa mwezi umodzi'),
(5, 5, 'Ntchisi government fertilizer subsidy program expanded', 'Umboni wamadzimadzi wopatsa manyowa mu Ntchisi wakulitsidwa'),
(6, 6, 'Dedza irrigation project boosts bean yields by 40%', 'Nchito ya nthaka mu Dedza yawonjezera zovunda za nyemba 40%'),
(7, 7, 'Kasungu soybean market expanding with new buyers', 'Msika wa soybeans mu Kasungu ukukula ndi ogula atsopano'),
(8, 8, 'Nkhata-Bay fish farming inputs now available at subsidized prices', 'Zida zolimitsa nsomba mu Nkhata-Bay zilipo pa mitengo yotsika'),
(9, 9, 'Rumphi cotton prices stabilize after bumper harvest', 'Mitengo ya ulimi wakotoni mu Rumphi yakhazikika pambuyo pokola kwambiri'),
(10, 10, 'Karonga rice cultivation training programs show success', 'Maphunziro okulima mpunga mu Karonga akufanizira bwino'),
(11, 11, 'Thyolo tea exports reach record highs to European markets', 'Kutulutsa tiyi ku Europe kufika pamlingo wapamwamba mu Thyolo'),
(12, 12, 'Chitipa cross-border trade agreements improved with Tanzania', 'Malangizo ogulitsa m\'mapeto a mzinda akonzedwanso ndi Tanzania mu Chitipa'),
(13, 13, 'Mangochi fish prices drop as lake catches increase', 'Mitengo ya nsomba mu Mangochi ikutsika chifukwa chakugwira nsomba kwambiri'),
(14, 14, 'Chikwawa rice farmers adopting climate-smart varieties', 'Alimi a mpunga mu Chikwawa akugwiritsa ntchito mitundu yosintha nyengo'),
(15, 15, 'Zomba pigeon pea exports reach new Asian markets', 'Kutulutsa nandolo ku Asia kuyambira ku Zomba'),
(16, 16, 'Nkhotakota cotton processing plant to open next season', 'Fakitale yopangira kotoni mu Nkhotakota izatsegulidwa mchaka chotsatira'),
(17, 17, 'Ntcheu bean storage facilities construction begins', 'Kumangidwa kwa mabokosi osungira nyemba mu Ntcheu kwatamba'),
(18, 18, 'Balaka soybean demand increasing with new processing plant. Monitor for more', 'Kufunika kwa soybeans mu Balaka kukwera ndi fakitale yatsopano'),
(19, 19, 'Mulanje tea workers receive 15% wage increase', 'Ogwira ntchito mu tiyi mu Mulanje alandira malipiro okwera 15%'),
(20, 20, 'Machinga groundnut farmers form new cooperative', 'Alimi a nthola mu Machinga apanga bungwe latsopano'),
(21, 21, 'Phalombe maize affected by armyworm outbreak', 'Chimanga mu Phalombe chikuvutika chifukwa cha zinyalala'),
(22, 22, 'Dowa tobacco farmers switching to sunflower cultivation', 'Alimi a fodya mu Dowa akusintha ku sunflower'),
(23, 23, 'Likoma fish prices rise as tourism season peaks', 'Mitengo ya nsomba mu Likoma ikwera panthawi ya ulendo'),
(24, 24, 'Salima rice exports to Mozambique increase 25%', 'Kutulutsa mpunga ku Mozambique kwakwera 25% mu Salima');

-- --------------------------------------------------------

--
-- Table structure for table `pest_control_tips`
--

CREATE TABLE `pest_control_tips` (
  `id` int NOT NULL,
  `crop_id` int NOT NULL,
  `district_id` int NOT NULL,
  `tip_en` text NOT NULL,
  `tip_ci` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pest_control_tips`
--

INSERT INTO `pest_control_tips` (`id`, `crop_id`, `district_id`, `tip_en`, `tip_ci`) VALUES
(1, 1, 1, 'Scout maize twice a week from emergence to tasselling; crush fall armyworm egg masses and apply recommended control only when many whorls show fresh damage.', 'Yang_anani chimanga kawiri pa sabata kuchokera kumera mpaka kutulutsa nthenga; phwanyani mazira a fall armyworm ndipo gwiritsani mankhwala ovomerezeka pokhapokha masamba ambiri awonetsa kuwonongeka kwatsopano.'),
(2, 2, 2, 'For tobacco, rotate nursery sites, sterilize seedbed soil, and remove seedlings with damping-off or viral symptoms immediately.', 'Pa fodya, sinthanitsani malo a nazale, yeretsani nthaka ya mabedi, ndipo chotsani mbande zokhala ndi damping-off kapena zizindikiro za virus nthawi yomweyo.'),
(3, 3, 3, 'Reduce groundnut aphids and rosette by planting early, removing volunteer groundnuts, and controlling aphids before leaves curl.', 'Chepetsani nsabwe ndi rosette pa nthowa pobzala msanga, kuchotsa nthowa zongomera zokha, ndi kulamulira nsabwe masamba asanakungike.'),
(4, 1, 4, 'Use push-pull where possible: plant Desmodium between maize rows and Napier or Brachiaria around the field to reduce stemborers and fall armyworm pressure.', 'Gwiritsani push-pull ngati n_kotheka: bzalani Desmodium pakati pa mizere ya chimanga ndi Napier kapena Brachiaria mozungulira munda kuti muchepetse stemborer ndi fall armyworm.'),
(5, 1, 5, 'Keep maize fields weed-free during the first 6 weeks; grassy weeds host stemborers and make armyworm scouting difficult.', 'Sungani munda wa chimanga wopanda udzu kwa masabata 6 oyambirira; udzu wa grass umasunga stemborer ndipo umapangitsa kuyendera armyworm kukhala kovuta.'),
(6, 1, 6, 'After harvest, destroy heavily infested maize stalks and rotate with legumes to break stemborer carry-over.', 'Mukatha kukolola, wonongani zitsinde za chimanga zomwe zawonongeka kwambiri ndipo sinthanitsani ndi nyemba kuti mudule moyo wa stemborer.'),
(7, 2, 7, 'Handpick tobacco hornworms during morning scouting and conserve beneficial wasps by avoiding unnecessary broad-spectrum sprays.', 'Tolaninso hornworm pa fodya mukayendera m_mawa ndipo sungani tizilombo tothandiza popewa kupopera mankhwala amphamvu osafunikira.'),
(8, 3, 8, 'Store groundnuts only when fully dry; use hermetic bags and inspect monthly for bruchids, mould, or aflatoxin risk.', 'Sungani nthowa zikakhala zouma bwino; gwiritsani matumba osalowa mpweya ndipo yang_anani mwezi uliwonse pa bruchids, nkhungu, kapena chiopsezo cha aflatoxin.'),
(9, 6, 9, 'Install pheromone traps and scout cotton squares weekly; treat bollworms based on threshold, not calendar spraying.', 'Ikani ma pheromone trap ndipo yang_anani mabatani a kotoni sabata iliyonse; lamulirani bollworm malinga ndi kuchuluka kwake osati kungopopera pa kalendala.'),
(10, 5, 10, 'For rice stem borers, remove rice stubble after harvest, synchronize planting with neighbours, and avoid excess nitrogen.', 'Pa stem borer wa mpunga, chotsani zitsinde za mpunga mukakolola, bzalani nthawi yofanana ndi oyandikana nawo, ndipo pewani nayitrojeni wambiri.'),
(11, 7, 11, 'Manage tea mosquito bug by pruning for airflow, removing badly damaged shoots, and using targeted sprays only on active hotspots.', 'Lamulirani tea mosquito bug podulira kuti mpweya uyende, kuchotsa mphukira zowonongeka kwambiri, ndi kupopera malo omwe ali ndi vuto lokha.'),
(12, 8, 12, 'Control coffee leaf rust with open pruning, balanced nutrition, removal of infected leaves, and timely copper or approved fungicide before long wet periods.', 'Lamulirani rust ya kofi ndi kudulira kotsegula, zakudya zoyenera, kuchotsa masamba odwala, ndi copper kapena fungicide yovomerezeka mvula yaitali isanayambe.'),
(13, 6, 13, 'Reduce cotton jassids and aphids by avoiding drought stress, conserving ladybirds, and spraying only when underside leaf counts exceed threshold.', 'Chepetsani jassid ndi nsabwe pa kotoni popewa chilala pa zomera, kusunga ladybird, ndi kupopera pokhapokha kuchuluka pansi pa masamba kwapitirira malire.'),
(14, 5, 14, 'In lowland rice, keep bunds clean and use alternate wetting and drying to reduce weeds, snails, and disease pressure.', 'Mu mpunga wa m_madambo, yeretsani malire a minda ndipo sinthanitsani kuthirira ndi kuumitsa kuti muchepetse udzu, nkhono, ndi matenda.'),
(15, 9, 15, 'Prevent bean bruchids by drying grain well, freezing or solar-heating small seed lots where practical, then sealing in hermetic storage.', 'Pewani bruchid wa nyemba poumitsa bwino, kuziziritsa kapena kutenthetsa ndi dzuwa mbewu zochepa ngati n_kotheka, kenako kusunga mosalowa mpweya.'),
(16, 4, 16, 'Scout soybeans for rust and frogeye leaf spot from flowering; improve airflow and apply approved fungicide early when disease is first seen.', 'Yang_anani soya pa rust ndi frogeye kuyambira maluwa; limbikitsani mpweya ndipo ikani fungicide yovomerezeka matenda akangoyamba kuoneka.'),
(17, 9, 17, 'Reduce bean root rot by rotating for at least two seasons, planting on ridges, and avoiding poorly drained fields.', 'Chepetsani matenda a mizu ya nyemba posinthanitsa mbewu kwa nyengo ziwiri kapena kuposerapo, kubzala pa mizere, ndi kupewa minda yosatulutsa madzi.'),
(18, 4, 18, 'Use yellow sticky traps and early scouting for soybean aphids and whiteflies; protect natural enemies before choosing sprays.', 'Gwiritsani ma trap achikasu ndi kuyendera msanga pa nsabwe ndi whitefly za soya; tetezani tizilombo tothandiza musanasankhe kupopera.'),
(19, 7, 19, 'For tea red spider mite, reduce dust, avoid water stress, prune old infested foliage, and spot-treat only affected blocks.', 'Pa red spider mite wa tiyi, chepetsani fumbi, pewani kusowa madzi, dulani masamba akale owonongeka, ndipo perekani mankhwala pa malo omwe ali ndi vuto lokha.'),
(20, 3, 20, 'For groundnut leaf spots, rotate crops, use clean seed, avoid overhead watering late in the day, and apply approved fungicide when early spots appear.', 'Pa leaf spot ya nthowa, sinthanitsani mbewu, gwiritsani mbewu yoyera, pewani kuthirira pamwamba madzulo, ndipo ikani fungicide yovomerezeka zizindikiro zikangoyamba.'),
(21, 1, 21, 'Protect stored maize with hermetic PICS-style bags or clean sealed drums; dry grain thoroughly and never mix new grain with infested old grain.', 'Tetezani chimanga chosungidwa ndi matumba a PICS kapena migolo yoyera yotsekedwa; yanikani njere bwino ndipo musasakanize chatsopano ndi chakale chokhala ndi tizilombo.'),
(22, 2, 22, 'Remove and bury or compost tobacco residues after harvest; volunteer plants carry aphids, whiteflies, and viral diseases into the next crop.', 'Chotsani ndi kukwirira kapena kupanga kompositi zotsalira za fodya mukatha kukolola; zomera zongomera zimasunga nsabwe, whitefly, ndi matenda a virus ku nyengo yotsatira.'),
(23, 6, 23, 'Use light traps only as monitoring aids for cotton moths; combine with field scouting so beneficial insects are not harmed unnecessarily.', 'Gwiritsani ma light trap ngati chida choyang_anira moth wa kotoni; phatikizani ndi kuyendera munda kuti tizilombo tothandiza tisawonongeke mosafunikira.'),
(24, 5, 24, 'Reduce rice blast by planting tolerant varieties, using clean seed, avoiding dense planting, and keeping nitrogen balanced.', 'Chepetsani rice blast pobzala mitundu yopirira, kugwiritsa mbewu yoyera, kupewa kubzala mopanikizana, ndi kusunga nayitrojeni moyenera.'),
(25, 8, 27, 'Control coffee berry disease by harvesting all ripe and dried berries, pruning for sunlight, and applying approved protectant before wet spells.', 'Lamulirani matenda a zipatso za kofi pokolola zipatso zonse zokhwima ndi zouma, kudulira kuti dzuwa lilowe, ndi kugwiritsa mankhwala oteteza mvula isanayambe.'),
(26, 9, 6, 'In horticultural-style bean plots, use raised beds, drip or furrow irrigation, and morning watering to reduce angular leaf spot and anthracnose.', 'M_minda ya nyemba ngati horticulture, gwiritsani mabedi okwezeka, kuthirira pa mizere kapena drip, ndi kuthirira m_mawa kuti muchepetse angular leaf spot ndi anthracnose.'),
(27, 4, 7, 'Rotate soybeans with cereals and avoid repeated soybean fields to reduce soybean cyst nematode, root rots, and soil-borne diseases.', 'Sinthanitsani soya ndi chimanga ndipo pewani kubwereza soya pamunda womwewo kuti muchepetse nematode, matenda a mizu, ndi matenda a m_nthaka.'),
(28, 3, 18, 'Use field sanitation against rodents in groundnut: clear hiding places, harvest promptly, and store pods off the floor.', 'Gwiritsani ukhondo wa munda polimbana ndi mbewa pa nthowa: chotsani malo obisalira, kololani pa nthawi yake, ndipo sungani makoko pamwamba osati pansi.'),
(29, 7, 25, 'In tea nurseries, prevent damping-off with sterile rooting media, raised benches, good drainage, and careful watering.', 'Mu nazale za tiyi, pewani damping-off ndi media yoyera, mabenchi okwezeka, madzi otuluka bwino, ndi kuthirira mosamala.'),
(30, 8, 26, 'For coffee berry borer, collect fallen berries, strip leftover berries after harvest, and use alcohol-baited traps for monitoring.', 'Pa coffee berry borer, sonkhanitsani zipatso zagwa, chotsani zotsala mukatha kukolola, ndipo gwiritsani ma trap okhala ndi alcohol poyang_anira.');

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `id` int NOT NULL,
  `seller_id` int NOT NULL,
  `rating_value` int NOT NULL,
  `review` text
) ;

--
-- Dumping data for table `ratings`
--

INSERT INTO `ratings` (`id`, `seller_id`, `rating_value`, `review`) VALUES
(1, 1, 5, 'Great service!'),
(2, 2, 4, 'Good quality products.'),
(3, 1, 5, 'Excellent service'),
(4, 2, 4, 'Good quality'),
(5, 3, 5, 'Very reliable'),
(6, 4, 3, 'Average delivery times'),
(7, 5, 4, 'Consistent supply'),
(8, 6, 5, 'Best prices'),
(9, 7, 4, 'Good communication'),
(10, 8, 3, 'Seasonal availability'),
(11, 9, 5, 'Premium products'),
(12, 10, 4, 'Professional conduct'),
(13, 11, 5, 'Flexible payment'),
(14, 12, 4, 'Wide variety'),
(15, 4, 4, 'Good quality soybeans'),
(16, 16, 5, 'Excellent rice quality'),
(17, 11, 4, 'Consistent tea supply'),
(18, 17, 3, 'Variable bean sizes'),
(19, 20, 5, 'Premium rice quality');

-- --------------------------------------------------------

--
-- Table structure for table `sellers`
--

CREATE TABLE `sellers` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `district_id` int NOT NULL,
  `contact_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `sellers`
--

INSERT INTO `sellers` (`id`, `name`, `district_id`, `contact_id`) VALUES
(1, 'Chimwemwe Banda', 1, 1),
(2, 'Esther Phiri', 2, 2),
(3, 'Joseph Mwale', 3, 3),
(4, 'Fatima Jere', 4, 4),
(5, 'Samuel Nyirenda', 5, 5),
(6, 'Grace Manda', 6, 6),
(7, 'Isaac Moyo', 7, 7),
(8, 'Wezi Nyirenda', 8, 8),
(9, 'Temwani Kanyenda', 9, 9),
(10, 'Chikondi Nkhoma', 10, 10),
(11, 'Madalitso Matope', 11, 11),
(12, 'Limbani Msowoya', 12, 12),
(13, 'Mphatso Chibwe', 13, 13),
(14, 'Tione Gondwe', 14, 14),
(15, 'Dalitso Kaunda', 15, 15),
(16, 'Fatsani Mbewe', 16, 16),
(17, 'Taonane Dzekedzeke', 17, 17),
(18, 'Wongani Zulu', 18, 18),
(19, 'Chisomo Tembo', 19, 19),
(20, 'Mary Kamanga', 24, 20);

-- --------------------------------------------------------

--
-- Table structure for table `seller_contact_details`
--

CREATE TABLE `seller_contact_details` (
  `id` int NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `seller_contact_details`
--

INSERT INTO `seller_contact_details` (`id`, `phone_number`, `email`, `address`) VALUES
(1, '+265 881 123 456', 'chimwemwe@agro.mw', 'Lilongwe City Market'),
(2, '+265 992 234 567', 'esther@agro.mw', 'Blantyre Limbe Market'),
(3, '+265 883 345 678', 'joseph@agro.mw', 'Mzuzu Main Market'),
(4, '+265 994 456 789', 'fatima@agro.mw', 'Mchinji Trading Centre'),
(5, '+265 885 567 890', 'samuel@agro.mw', 'Ntchisi Boma'),
(6, '+265 996 678 901', 'grace@agro.mw', 'Dedza Agricultural Office'),
(7, '+265 887 789 012', 'isaac@agro.mw', 'Kasungu Grain Market'),
(8, '+265 998 890 123', 'wezi@agro.mw', 'Nkhata Bay Lakeshore'),
(9, '+265 889 901 234', 'temwani@agro.mw', 'Rumphi Boma'),
(10, '+265 990 012 345', 'chikondi@agro.mw', 'Karonga Market'),
(11, '+265 881 234 567', 'madalitso@agro.mw', 'Thyolo Tea Estate'),
(12, '+265 992 345 678', 'limbani@agro.mw', 'Chitipa Border Post'),
(13, '+265 883 456 789', 'mphatso@agro.mw', 'Mangochi Lakeside'),
(14, '+265 994 567 890', 'tione@agro.mw', 'Chikwawa Trading Centre'),
(15, '+265 885 678 901', 'dalitso@agro.mw', 'Zomba Plateau Market'),
(16, '+265 996 789 012', 'fatsani@agro.mw', 'Nkhotakota Rice Market'),
(17, '+265 887 890 123', 'taonane@agro.mw', 'Ntcheu Boma'),
(18, '+265 998 901 234', 'wongani@agro.mw', 'Balaka Market'),
(19, '+265 889 012 345', 'chisomo@agro.mw', 'Mulanje Tea Market'),
(20, '+265 990 123 456', 'mary@agro.mw', 'Salima Lakeshore');

-- --------------------------------------------------------

--
-- Table structure for table `seller_crops`
--

CREATE TABLE `seller_crops` (
  `seller_id` int NOT NULL,
  `crop_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `seller_crops`
--

INSERT INTO `seller_crops` (`seller_id`, `crop_id`) VALUES
(1, 1),
(4, 1),
(6, 1),
(7, 1),
(9, 1),
(14, 1),
(16, 1),
(17, 1),
(20, 1),
(2, 2),
(7, 2),
(1, 3),
(2, 3),
(5, 3),
(8, 3),
(11, 3),
(13, 3),
(15, 3),
(18, 3),
(4, 4),
(15, 4),
(18, 4),
(8, 5),
(10, 5),
(13, 5),
(16, 5),
(20, 5),
(10, 6),
(14, 6),
(11, 7),
(19, 7),
(3, 8),
(9, 8),
(12, 8),
(3, 9),
(5, 9),
(6, 9),
(12, 9),
(17, 9),
(19, 9);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `basic_farming_info`
--
ALTER TABLE `basic_farming_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `buyers`
--
ALTER TABLE `buyers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `district_id` (`district_id`),
  ADD KEY `buyers_ibfk_2` (`contact_id`);

--
-- Indexes for table `buyer_contact_details`
--
ALTER TABLE `buyer_contact_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `buyer_crops`
--
ALTER TABLE `buyer_crops`
  ADD PRIMARY KEY (`buyer_id`,`crop_id`),
  ADD KEY `crop_id` (`crop_id`);

--
-- Indexes for table `community_qa`
--
ALTER TABLE `community_qa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `district_id` (`district_id`);

--
-- Indexes for table `crops`
--
ALTER TABLE `crops`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `crop_prices`
--
ALTER TABLE `crop_prices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `crop_id` (`crop_id`);

--
-- Indexes for table `districts`
--
ALTER TABLE `districts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `farming_best_practices`
--
ALTER TABLE `farming_best_practices`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `crop_id` (`crop_id`,`practice_type`);

--
-- Indexes for table `market_insights`
--
ALTER TABLE `market_insights`
  ADD PRIMARY KEY (`id`),
  ADD KEY `district_id` (`district_id`);

--
-- Indexes for table `pest_control_tips`
--
ALTER TABLE `pest_control_tips`
  ADD PRIMARY KEY (`id`),
  ADD KEY `crop_id` (`crop_id`),
  ADD KEY `district_id` (`district_id`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `seller_id` (`seller_id`);

--
-- Indexes for table `sellers`
--
ALTER TABLE `sellers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `district_id` (`district_id`),
  ADD KEY `sellers_ibfk_2` (`contact_id`);

--
-- Indexes for table `seller_contact_details`
--
ALTER TABLE `seller_contact_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `seller_crops`
--
ALTER TABLE `seller_crops`
  ADD PRIMARY KEY (`seller_id`,`crop_id`),
  ADD KEY `crop_id` (`crop_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `basic_farming_info`
--
ALTER TABLE `basic_farming_info`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `buyers`
--
ALTER TABLE `buyers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `buyer_contact_details`
--
ALTER TABLE `buyer_contact_details`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `community_qa`
--
ALTER TABLE `community_qa`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `crops`
--
ALTER TABLE `crops`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `crop_prices`
--
ALTER TABLE `crop_prices`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `districts`
--
ALTER TABLE `districts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `farming_best_practices`
--
ALTER TABLE `farming_best_practices`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `market_insights`
--
ALTER TABLE `market_insights`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `pest_control_tips`
--
ALTER TABLE `pest_control_tips`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sellers`
--
ALTER TABLE `sellers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `seller_contact_details`
--
ALTER TABLE `seller_contact_details`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `buyers`
--
ALTER TABLE `buyers`
  ADD CONSTRAINT `buyers_ibfk_1` FOREIGN KEY (`district_id`) REFERENCES `districts` (`id`),
  ADD CONSTRAINT `buyers_ibfk_2` FOREIGN KEY (`contact_id`) REFERENCES `buyer_contact_details` (`id`);

--
-- Constraints for table `buyer_crops`
--
ALTER TABLE `buyer_crops`
  ADD CONSTRAINT `buyer_crops_ibfk_1` FOREIGN KEY (`buyer_id`) REFERENCES `buyers` (`id`),
  ADD CONSTRAINT `buyer_crops_ibfk_2` FOREIGN KEY (`crop_id`) REFERENCES `crops` (`id`);

--
-- Constraints for table `community_qa`
--
ALTER TABLE `community_qa`
  ADD CONSTRAINT `community_qa_ibfk_1` FOREIGN KEY (`district_id`) REFERENCES `districts` (`id`);

--
-- Constraints for table `crop_prices`
--
ALTER TABLE `crop_prices`
  ADD CONSTRAINT `crop_prices_ibfk_1` FOREIGN KEY (`crop_id`) REFERENCES `crops` (`id`);

--
-- Constraints for table `farming_best_practices`
--
ALTER TABLE `farming_best_practices`
  ADD CONSTRAINT `farming_best_practices_ibfk_1` FOREIGN KEY (`crop_id`) REFERENCES `crops` (`id`);

--
-- Constraints for table `market_insights`
--
ALTER TABLE `market_insights`
  ADD CONSTRAINT `market_insights_ibfk_1` FOREIGN KEY (`district_id`) REFERENCES `districts` (`id`);

--
-- Constraints for table `pest_control_tips`
--
ALTER TABLE `pest_control_tips`
  ADD CONSTRAINT `pest_control_tips_ibfk_1` FOREIGN KEY (`crop_id`) REFERENCES `crops` (`id`),
  ADD CONSTRAINT `pest_control_tips_ibfk_2` FOREIGN KEY (`district_id`) REFERENCES `districts` (`id`);

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `sellers` (`id`);

--
-- Constraints for table `sellers`
--
ALTER TABLE `sellers`
  ADD CONSTRAINT `sellers_ibfk_1` FOREIGN KEY (`district_id`) REFERENCES `districts` (`id`),
  ADD CONSTRAINT `sellers_ibfk_2` FOREIGN KEY (`contact_id`) REFERENCES `seller_contact_details` (`id`);

--
-- Constraints for table `seller_crops`
--
ALTER TABLE `seller_crops`
  ADD CONSTRAINT `seller_crops_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `sellers` (`id`),
  ADD CONSTRAINT `seller_crops_ibfk_2` FOREIGN KEY (`crop_id`) REFERENCES `crops` (`id`);
--
-- Table structure for table `crowdsourced_prices`
--

CREATE TABLE IF NOT EXISTS `crowdsourced_prices` (
  `id`           int          NOT NULL AUTO_INCREMENT,
  `crop_id`      int          NOT NULL,
  `district_id`  int          DEFAULT NULL,
  `price_per_kg` decimal(10,2) NOT NULL,
  `unit`         varchar(20)  NOT NULL DEFAULT 'kg',
  `market_name`  varchar(200) DEFAULT NULL,
  `submitted_by` varchar(50)  NOT NULL DEFAULT 'anonymous',
  `channel`      enum('web','ussd') NOT NULL DEFAULT 'web',
  `created_at`   timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_crop_id`     (`crop_id`),
  KEY `idx_district_id` (`district_id`),
  KEY `idx_created_at`  (`created_at`),
  CONSTRAINT `cp_crop_fk`     FOREIGN KEY (`crop_id`)     REFERENCES `crops`     (`id`),
  CONSTRAINT `cp_district_fk` FOREIGN KEY (`district_id`) REFERENCES `districts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
