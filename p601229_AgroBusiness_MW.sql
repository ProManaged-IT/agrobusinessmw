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
(1, 1, 'Planting', 'Plant at 75cm spacing in rows.', 'Bzalani pa mtunda wa 75cm m’mizere.'),
(2, 2, 'Harvesting', 'Harvest leaves when yellow.', 'Kolorani masamba akayamba kukhala achikasu.'),
(3, 3, 'Growing', 'Weed regularly to improve yield.', 'Palani nthawi zonse kuti zivunde bwino.'),
(4, 1, 'Watering', 'Water deeply 2x/week', 'Thirirani kwambiri kawiri pa sabata'),
(5, 1, 'Harvesting', 'Harvest when husks dry', 'Koloni pamene makokolowa auma'),
(6, 2, 'Planting', 'Use raised seed beds', 'Gwiritsani ntchito mabuledi okweza'),
(7, 2, 'Drying', 'Proper air circulation needed', 'Kuyanika kofunikira mpweya wabwino'),
(8, 2, 'Processing', 'Remove midribs carefully', 'Chotsani misempha mosamala'),
(9, 3, 'Planting', 'Plant in well-drained soil', 'Bzalani m\'nthaka yopititsa madzi'),
(10, 3, 'Weeding', 'Weed before flowering', 'Palanipo musanabere'),
(11, 3, 'Storage', 'Store in dry conditions', 'Sungani mumalo owuma'),
(12, 4, 'Planting', 'Plant in well-drained loamy soil', 'Bzalani m\'nthaka yopititsa madzi ya loamy'),
(13, 4, 'Harvesting', 'Harvest when 95% of pods are brown', 'Koloni pamene 95% ya mapods ali brown'),
(14, 5, 'Planting', 'Requires flooded fields during growth', 'Imafuna minda yodzaza madzi panthawi yokula'),
(15, 5, 'Processing', 'Dry to 14% moisture before milling', 'Pukutani mpaka 14% m\'madzi musanagaye'),
(16, 6, 'Planting', 'Plant after first rains', 'Bzalani mutagwa mvula yoyamba'),
(17, 7, 'Pruning', 'Prune bushes to 45cm height annually', 'Chepetsani makunjo mpaka 45cm kutalika chaka chilichonse'),
(18, 8, 'Processing', 'Ferment beans for 24-48 hours', 'Ikani kofi kuti ifemente maola 24-48'),
(19, 9, 'Planting', 'Space seeds 10cm apart in rows', 'Bzalani mbeu pa mtunda wa 10cm m\'mizere');

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
(1, 1, 1, 'Use neem oil weekly to control maize stalk borers in Lilongwe', 'Gwiritsani mafuta a neem sabata iliyonse kuchepetsa zinyalala za chimanga mu Lilongwe'),
(2, 2, 2, 'Rotate tobacco with legumes to reduce nematodes in Blantyre', 'Sinthanitsani fodya ndi nyemba kuchepetsa nematodes mu Blantyre'),
(3, 3, 3, 'Apply sulfur dust to prevent groundnut aphids in Mzuzu', 'Ikani fumbi la sulfur kuteteza nsabwe ya nthola mu Mzuzu'),
(4, 1, 4, 'Early planting reduces maize pest pressure in Mchinji', 'Kubzala posachedwa kuchepetsa zinyalala za chimanga mu Mchinji'),
(5, 1, 5, 'Use push-pull technology for maize pests in Ntchisi', 'Gwiritsani ntchito push-pull kuchepetsa zinyalala za chimanga mu Ntchisi'),
(6, 1, 6, 'Remove infected maize plants early in Dedza', 'Chotsani zomera zowopsedwa za chimanga posachedwa mu Dedza'),
(7, 2, 7, 'Monitor for tobacco hornworms in Kasungu', 'Yang\'anirani tizilombo ta hornworms mu fodya mu Kasungu'),
(8, 3, 8, 'Store groundnuts with neem leaves in Nkhata-Bay', 'Sungani nthola ndi masamba a neem mu Nkhata-Bay'),
(9, 4, 9, 'Use pheromone traps for cotton bollworms in Rumphi', 'Gwiritsani ntchito matrap a pheromone kuchepetsa zinyalala za kotoni mu Rumphi'),
(10, 5, 10, 'Practice field flooding to control rice stem borers in Karonga', 'Gwiritsani ntchito madzi minda kuchepetsa zinyalala za mpunga mu Karonga'),
(11, 7, 11, 'Use yellow sticky traps for tea mosquitoes in Thyolo', 'Gwiritsani ntchito matrap oyera ofiira pa udzudzu wa tiyi mu Thyolo'),
(12, 8, 12, 'Apply copper fungicide for coffee rust in Chitipa', 'Patsani mankhwala a copper pa malungwa a kofi mu Chitipa'),
(13, 6, 13, 'Spray neem oil weekly for cotton pests in Mangochi', 'Patsani mafuta a neem sabata iliyonse kuchepetsa zinyalala za kotoni mu Mangochi'),
(14, 5, 14, 'Introduce ducks in rice fields for natural pest control in Chikwawa', 'Lowetsani bakha muminda ya mpunga kuchepetsa zinyalala mwachilengedwe mu Chikwawa'),
(15, 9, 15, 'Use hermetic storage for bean bruchids in Zomba', 'Gwiritsani ntchito njira yosungira bwino kuchepetsa mbewa ya nyemba mu Zomba'),
(16, 4, 16, 'Intercrop soybeans with maize to reduce pests in Nkhotakota', 'Bzalani soybeans limodzi ndi chimanga kuchepetsa zinyalala mu Nkhotakota'),
(17, 9, 17, 'Solarize soil to reduce bean root rot in Ntcheu', 'Gwiritsani ntchito dzuza kutentha nthaka kuchepetsa matenda a mizu ya nyemba mu Ntcheu'),
(18, 4, 18, 'Use neem extract for soybean aphids in Balaka', 'Gwiritsani neem kuchepetsa nsabwe ya soybeans mu Balaka'),
(19, 7, 19, 'Prune tea bushes regularly to improve air circulation in Mulanje', 'Cheperani makunjo a tiyi nthawi zonse kupititsa mpweya mu Mulanje'),
(20, 3, 20, 'Apply wood ash to control groundnut pests in Machinga', 'Gwiritsani ntchito phulusa kuchepetsa zinyalala za nthola mu Machinga'),
(21, 1, 21, 'Use PICS bags for maize storage pests in Phalombe', 'Gwiritsani ntchito PICS bags kuchepetsa zinyalala zosungira chimanga mu Phalombe'),
(22, 2, 22, 'Remove tobacco residue after harvest in Dowa', 'Chotsani zotsalira za fodya pambuyo pokola kuchepetsa zinyalala mu Dowa'),
(23, 6, 23, 'Use light traps for cotton pests in Likoma', 'Gwiritsani ntchito matrap a kuwala kuchepetsa zinyalala za kotoni mu Likoma'),
(24, 5, 24, 'Proper spacing reduces rice blast disease in Salima', 'Kubzalira mtunda kuchepetsa matenda a mpunga mu Salima');

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `market_insights`
--
ALTER TABLE `market_insights`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `pest_control_tips`
--
ALTER TABLE `pest_control_tips`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

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
