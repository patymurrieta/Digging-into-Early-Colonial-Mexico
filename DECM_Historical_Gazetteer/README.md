![alt text](https://www.lancaster.ac.uk/digging-ecm/wp-content/uploads/2018/04/Logo-sticky-header-345.png  "Digging into Early Colonial Mexico Logo")
# The DECM Historical Gazetteer

## What you will find here
The DECM Historical Gazetteer is a digital gazetteer of historical places in Mexico available in different formats and built from detailed research. This includes a 16th century version (*The DECM 16th Century Gazetteer*) with the toponyms mentioned in primary sources including the Relaciones Geográficas (1577-1585) and the Suma de Visitas de los Pueblos de la Nueva España (1548-1550), as well as information on the political, religious and administrative units of the Viceroyalty of New Spain. 
The gazetteer is composed of 71 files with geographic information of colonial provinces, alcaldias, corregimientos, diocesis, among many others, as well as thousands of historical cities, towns, villages, and other places. This is integrated in an interoperable model containing thousands of historical locations with alternative spelling place-name variations. The dataset also includes 40 tables with additional historical information related to toponyms, languages, repositories, maps, etc.

### Contents:
``` 
1. The DECM Gazetteer: 
	This version includes all the researched historical toponyms contained in primary and secondary sources and it can 
  be provisionally consulted here: <link>. The information is organised by RG volume. It also includes layers and tables 
  of historical information digitised and/or created by the project from secondary sources. All is accompanied by 
  metadata, including the DECM Gazetteer Registry. 
This set is composed by: a) all toponyms with coordinates, mentioned and disambiguated from the edited collections of the RGs and 
from secondary sources as specified below; b) 30 geographical layers of additional historical information derived from secondary sources; 
c) 32 tables with other important historical information related to the RGs; d) a table with the percentages of disambiguation achieved 
for each volume; e) the DECM Gazetteer Registry; f) a text file with the sources used for disambiguation; and g) a README file with all 
information on the dataset.
  
2. The DECM 16th century Gazetteer:
	This version constitutes a subset of the main DECM Historical Gazetteer, including only the toponyms that were 
	mentioned in the RG reports and the Suma de Visita de los Pueblos, providing a precise window into the period 
	when these were recorded (1548-1550/1577-1585). 
	This dataset contains: the toponyms with coordinates, mentioned and disambiguated for each RG volume and the Suma; 
	plus, the 30 geographical layers and 32 tables as explained above, as well as the DECM Gazetteer Registry. 


3. The DECM Gazetteer Registry:
	This is a record for quick reference of all the files available in the Gazetteer.
	
The DECM_Gazetteer contains 5 folders with spatial and tabular information, and 3 documents. 

The folders contain:

	DECM_Gazetteer_primarysources: Contains 17 shapefiles (points and polygons) with historical geographies. They have been created from the indexes of the edited volumes of the Relaciones Geográficas de la Nueva España and Yucatán published by Acuña, De la Garza, and the Suma de Visita de los Pueblos by Del Paso y Troncoso (see sources used) disambiguated and atomized in a spatial database. Each shapefile include the following attributes: ID, Place name, Alternative Names, Modern Name, References, Location, Confidence Degree, ID of a related location, Relationship shared, Location Type, Type Thesaurus URL, Coord X, Coord Y, Time spam URL, Start date, End date. Every shapefile includes metadata.

	Acuna_2_Antequera1.shp
        Acuna_3_Antequera2.shp
        Acuna_4_Tlaxcala1.shp
        Acuna_5_Tlaxcala2.shp
        Acuna_6_Mexico1.shp
        Acuna_7_Mexico2.shp
        Acuna_8_Mexico3.shp
        Acuna_9_Michoacan.shp
        Acuna_10_NuevaGalicia.shp
        DPYT_Suma.shp
        DPYT_Suma_Text.shp
        DLG_Yucatan.shp
        Acuna_4_Tlaxcala1_polygons.shp
        Acuna_5_Tlaxcala2_polygons.shp
        Acuna_6_Mexico1_polygons.shp
        Acuna_7_Mexico2_polygons.shp
        Acuna_8_Mexico3_polygons.shp

    DECM_Gazetteer_secondarysources: Contains 4 shapefiles (points and polygons) with historical information mentioned and collected from 4 secondary sources. They have been created by digitising and disambiguating the places mentioned in the sources (see sources used):

        MorenoToscano_i08.shp
        Gerhard_NewSpain.shp
        Gerhard_SEFrontier_polygons.shp
        Gerhard_SEFrontier.shp

    DECM_Additional_Information: Contains 49 shapefiles (points and polygons) with additional information on historical geographies. They have been created by digitising historical studies on 16th century Colonial History of Mexico.

        15_States.shp
        DeLaGarza.shp
        Gobiernos.shp
        Audiencias.shp (x2: point and polygon)
        Dioceses.shp (x2: point and polygon)
        ethnohistorical_regions.shp
        provincias_1570.shp
        mexico_minor_civil_division.shp
        tlaxcala_minor_civil_division.shp
        mechoacan_minor_civil_division.shp
        antequera_minor_civil_division.shp
        yucatan_minor_civil_division.shp
        58_gerhard_dioceses
        59_gerhard_minor_divisions_1786.shp
        60_gerhard_subgobierno_1786.shp
        61_gerhard_NE_1786.shp
        62_gerhard_intendancies_1786.shp
        63_roys_yucatan_provincias.shp; 63_roys_yucatan_provincias_line.shp
        66_H_III_1_A_provincias.shp
        67_H_III_1_B_audiencias.shp
        68_H_II_3_senorios.shp
        69_H_II_2_entidades_politicas.shp
        70_H_III_1_C_eclesiastica.shp
        72_H_II_2_inset.shp
        73_texcoco_lago.shp
        76_se_frontier_subdelegacion.shp
        77_se_frontier__intendancy.shp
        78_se_fronter_gobierno.shp
        79_se_frontier_audiencia.shp
        80_se_frontier_control_limits.shp
        81_ng_minor_civil_division.shp
        87_civil_divisions_1580
        mexico_alcaldia_mayor_ct.shp
        tlaxcala_alcaldia_mayor_ct.shp
        mechoacan_alcaldia_mayor_ct.shp
        antequera_alcaldia_mayor_ct.shp
        yucatan_alcaldia_mayor_ct.shp
        mexico_corregimiento_ct.shp
        tlaxcala_corregimiento_ct.shp
        mechoacan_corregimiento_ct.shp
        antequera_corregimiento_ct.shp
        yucatan_corregimiento_ct.shp
        64_roys_yucatan_locations.shp
        74_texcoco_locations.shp
        82_ng_alcaldia_mayor.shp
        83_ng_corregimiento.shp
        86_tarascan_region_locations
        88_gerhard_locations.shp
        75_texcoco_rivers.shp

    DECM_Tables: Cointains 2 folders with additional tabular data with relevant information about 16th century colonial Mexico in two formats: csv and xlsx

        DeLaGarza_Index_Yucatan
        1_Acuña_Guatemala_Index
        2_Acuña_Antequera1_Index
        3_Acuña_Antequera2_Index
        5_Acuña_Tlaxcala2_Index
        4_Acuña_Tlaxcala1_Index
        6_Acuna_Mexico1_Index
        7_Acuna_Mexico2_Index
        8_Acuna_Mexico3_Index
        9_Acuna_Michoacan_Index
        10_Acuna_NuevaGalicia_Index
        2_Acuña_Antequera1_NoCoord
        3_Acuña_Antequera2_NoCoord
        4_Acuña_Tlaxcala1_NoCoord
        5_Acuña_Tlaxcala2_NoCoord
        6_Acuna_Mexico1_NoCoord
        7_Acuna_Mexico2_NoCoord
        8_Acuna_Mexico3_NoCoord
        9_Acuna_Michoacan_NoCoord
        10_Acuna_NuevaGalicia_NoCoord
        cline_1964_1972_relaciones_status
        cline_1972_archdioceses
        cline_1972_ethnohistorical_regions
        cline_1972_colonial_jurisdictions
        Count_municip-states
        cline_1972_rg_repositories
        harvey_language_index_census
        harvey_language_index_RG
        Gerhard1972_AGuide_Index
        Gerhard1972_SE_Frontier_Index
        garcia_cubas_diccionario_historico
        DelPasoYTroncoso_Suma_Index
        Index_MorenoToscano1968
        DeLaGarza_Index_Yucatan
        DeLa_Garza_Yucatan_Index2
        DeLa_Garza_Yucatán_RG_status
        starr_aztec_place-names
        harvey_language_index
        Echenique_pictogramas_codices
        Echenique_relaciones

    DECM_ADL_AdditionalInformation - Contains the same historical information as DECM_Additional_Information, but attributes headings have been adapted to the Alexandria Digital Library Content Standard schema. 

Documents:

    DECM_Gazetteer_Disambiguation_Percentage.xlsx - Excel document with the total amount of place names included in the Relaciones Geográficas de Nueva España and Yucatán, places disambiguated with X and Y coordinates and without. 

    DECM_Gazetteer_Registry.xlsx: Excel file with a list of all the information of sources and attibutes included in DECM_Gazetteer_primarysources, DECM_Gazetteer_secondarysources, DECM_Additional_Information, and DECM_Tables.

    Souces_for_the_Disambiguation - Word file with the bibliographical references used to locate the place names in DECM_Gazetteer_primarysources folder. 


-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

SOURCES USED:

PRIMARY SOURCES

Acuña, René. 1984. Relaciones Geográficas del siglo XVI: Antequera. Tomo primero. 1 edition. México: Universidad Autónoma de México, Imprenta Universitaria.
Acuña, René. 1984. Relaciones Geográficas del siglo XVI: Antequera. Tomo segundo. 1 edition. México: Universidad Autónoma de México, Imprenta Universitaria. 
Acuña, René. 1984. Relaciones Geográficas del siglo XVI: Tlaxcala. Tomo primero. 1 edition. México: Universidad Autónoma de México, Imprenta Universitaria. 
Acuña, René. 1985. Relaciones Geográficas del siglo XVI: Tlaxcala. Tomo segundo. 1 edition. México: Universidad Autónoma de México, Imprenta Universitaria. 
Acuña, René. 1985. Relaciones Geográficas del siglo XVI: México. Tomo primero. 1 edition. México: Universidad Autónoma de México, Imprenta Universitaria.
Acuña, René. 1986. Relaciones Geográficas del siglo XVI: México. Tomo segundo. 1 edition. México: Universidad Autónoma de México, Imprenta Universitaria. 
Acuña, René. 1986. Relaciones Geográficas del siglo XVI: México. Tomo tercero. 1 edition. México: Universidad Autónoma de México, Imprenta Universitaria.
Acuña, René. 1987. Relaciones Geográficas del siglo XVI: Michoacán. 1 edition. México: Universidad Autónoma de México, Imprenta Universitaria.
Acuña, René. 1988. Relaciones Geográficas del siglo XVI: Nueva Galicia. 1 edition. México: Universidad Autónoma de México, Imprenta Universitaria. 
Acuña, René. 1984. Relaciones Geográficas del siglo XVI: Tlaxcala. Tomo primero. 1 edition. México: Universidad Autónoma de México, Imprenta Universitaria. 
Acuña, René. 1985. Relaciones Geográficas del siglo XVI: Tlaxcala. Tomo segundo. 1 edition. México: Universidad Autónoma de México, Imprenta Universitaria. 
Acuña, René. 1985. Relaciones Geográficas del siglo XVI: México. Tomo primero. 1 edition. México: Universidad Autónoma de México, Imprenta Universitaria.
Acuña, René. 1986. Relaciones Geográficas del siglo XVI: México. Tomo segundo. 1 edition. México: Universidad Autónoma de México, Imprenta Universitaria. 
Acuña, René. 1986. Relaciones Geográficas del siglo XVI: México. Tomo tercero. 1 edition. México: Universidad Autónoma de México, Imprenta Universitaria.
De la Garza, Mercedes. 1983. Relaciones histórico-geográficas de la gobernación de Yucatán (Mérida, Valladolid y Tabasco) Volumen 2: 441-448.
Del Paso y Troncoso, Francisco. 1905. Papeles de la Nueva España publicados de orden y con fondos del Gobierno Mexicano. Tomo I. Suma de Visitas de Pueblos por Orden Alfabético. Madrid: Biblioteca Nacional de Madrid

SECONDARY SOURCES

Gerhard, Peter. 1972. A Guide to the Historical Geography of New Spain. 1 edition. Cambridge Eng.: Cambridge University Press. 
Gerhard, Peter. 1979. The Southeast Frontier of New Spain. Princeton University Press. 
Moreno Toscano, Alejandra (1968): Geografía económica de México (siglo XVI). Colegio de México. Appendix 4, p. 151-7. 

ADDITIONAL INFORMATION 

Arqueología Mexicana, 2018 'La Cuenca de México en 1519' [updated 2019: https://www.facebook.com/arqueomex/photos/a.350385424999742/2662751650429763/?type=3]
Cline, Howard F. 1972 'Ethnohistorical Regions of Middle America' In Handbook of Middle American Indians, Volume 12: Guide to Ethnohistorical Sources, Part One, edited by Howard F. Cline, 63–137. University of Texas Press.
Cline, Howard F. 1972 'Introductory Notes on Territorial Divisions of Middle America' In Handbook of Middle American Indians, Volume 12: Guide to Ethnohistorical Sources, Part One, edited by Howard F. Cline, 17-62. 
De la Garza, Mercedes (1983): Relaciones histórico-geográficas de la gobernación de Yucatán (Mérida, Valladolid y Tabasco) Volumen 2: 441-448.
Gerhard, Peter. 1972a. A Guide to the Historical Geography of New Spain. 1 edition. Cambridge Eng.: Cambridge University Press.
Gerhard, Peter, 1972b ‘Colonial New Spain 1519-1786: Historical Notes on the Evolution of Minor Political Jurisdctions’. In Handbook of Middle American Indians, Volume 12: Guide to Ethnohistorical Sources, Part One, edited by Howard F. Cline, 63–137. University of Texas Press. 
Gerhard, Peter, 1979 'Map 5: The Southeast Frontier in 1786' in The Southeast Frontier of New Spain (Princeton University Press', p. 19 
Instituto de Geografía, UNAM. 2007. "H_II_3 Pueblos Indigenas y Ciudades Prehispanicas en 1519", Atlas Nacional de México 
Instituto de Geografía, UNAM. 2007. "Map H_II_2: Mapa Politico-Territorial de Mesoamerica hacia 1520", Atlas Nacional de México
Instituto de Geografía, UNAM. 2007. "Map H_II_2: Mapa Politico-Territorial de Mesoamerica hacia 1520", Atlas Nacional de México 
Instituto de Geografía, UNAM. 2007. 'Map A: 'Division Antigua (Provincias y Reinos) 1558-1776'; "H III 1 Mapa Politico Novohispano: Division Territorial, 1550-1813", Atlas Nacional de México 
Instituto de Geografía, UNAM. 2007. 'Map B: 'Division en audiencias, siglo XVI-XVII'; "H III 1 Mapa Politico Novohispano: Division Territorial, 1550-1813", Atlas Nacional de México
Instituto de Geografía, UNAM. 2007. 'Map C: 'División Eclesiástica (Obispados), 1519-1577'; "H III 1 Mapa Politico Novohispano: Division Territorial, 1550-1813", Atlas Nacional de México 
Perlsetin Pollard, Hellen. 1994. 'Fig. 7.2 Sixteenth-century ethnic/linguistic boundaries. Based on Brand 1943)', 'Ethnicity and political control in a complex society: the Tarascan state of prehispanic Mexico' in Elizabeth M. Brumfiel (ed.) and John W. Fox, Factional competition and political development in the New World, (Cambridge University Press), pp. 89-102 (p. 81) 
Vargas, 2015. 'Mapa 1: Provincias de Yucatán (Roys 1957)' in Ernesto Vargas, Itzamkanac y Acalan: Tiempos de crisis anticipando el futuro', (Instituto de Investigaciones Antropológicas, UNAM, 2015), p. 31.

TABLES 

Acuña, René. 1984. Relaciones Geográficas del siglo XVI: Antequera. Tomo primero. 1 edition. México: Universidad Autónoma de México, Imprenta Universitaria.
Acuña, René. 1984. Relaciones Geográficas del siglo XVI: Antequera. Tomo segundo. 1 edition. México: Universidad Autónoma de México, Imprenta Universitaria. 
Acuña, René. 1984. Relaciones Geográficas del siglo XVI: Tlaxcala. Tomo primero. 1 edition. México: Universidad Autónoma de México, Imprenta Universitaria. 
Acuña, René. 1985. Relaciones Geográficas del siglo XVI: Tlaxcala. Tomo segundo. 1 edition. México: Universidad Autónoma de México, Imprenta Universitaria. 
Acuña, René. 1985. Relaciones Geográficas del siglo XVI: México. Tomo primero. 1 edition. México: Universidad Autónoma de México, Imprenta Universitaria.
Acuña, René. 1986. Relaciones Geográficas del siglo XVI: México. Tomo segundo. 1 edition. México: Universidad Autónoma de México, Imprenta Universitaria. 
Acuña, René. 1986. Relaciones Geográficas del siglo XVI: México. Tomo tercero. 1 edition. México: Universidad Autónoma de México, Imprenta Universitaria.
Acuña, René. 1987. Relaciones Geográficas del siglo XVI: Michoacán. 1 edition. México: Universidad Autónoma de México, Imprenta Universitaria.
Acuña, René. 1988. Relaciones Geográficas del siglo XVI: Nueva Galicia. 1 edition. México: Universidad Autónoma de México, Imprenta Universitaria. 
Acuña, René. 1984. Relaciones Geográficas del siglo XVI: Tlaxcala. Tomo primero. 1 edition. México: Universidad Autónoma de México, Imprenta Universitaria. 
Acuña, René. 1985. Relaciones Geográficas del siglo XVI: Tlaxcala. Tomo segundo. 1 edition. México: Universidad Autónoma de México, Imprenta Universitaria. 
Acuña, René. 1985. Relaciones Geográficas del siglo XVI: México. Tomo primero. 1 edition. México: Universidad Autónoma de México, Imprenta Universitaria.
Acuña, René. 1986. Relaciones Geográficas del siglo XVI: México. Tomo segundo. 1 edition. México: Universidad Autónoma de México, Imprenta Universitaria. 
Acuña, René. 1986. Relaciones Geográficas del siglo XVI: México. Tomo tercero. 1 edition. México: Universidad Autónoma de México, Imprenta Universitaria.
Cline, Howard F. 1964 'The Relaciones Geograficas of the Spanish Indies, 1577-1586' In The Hispanic American Historical Review, 44:3, 341-374. pp. 372-374; Cline, Howard F. 1972 'The Relaciones Geográficas of the Spanish Indies, 1577-1648' In Handbook of Middle American Indians, Volume 12: Guide to Ethnohistorical Sources, Part One, edited by Howard F. Cline, 183-242. University of Texas Press. pp. 185-188.
Cline, Howard F. 1972 'Introductory Notes on Territorial Divisions of Middle America' In Handbook of Middle American Indians, Volume 12: Guide to Ethnohistorical Sources, Part One, edited by Howard F. Cline, 17-62. University of Texas Press. 
De la Garza, Mercedes. 1983. Relaciones histórico-geográficas de la gobernación de Yucatán (Mérida, Valladolid y Tabasco) Volumen 2.
Del Paso y Troncoso, Francisco. 1905. Papeles de la Nueva España publicados de orden y con fondos del Gobierno Mexicano. Tomo I. Suma de Visitas de Pueblos por Orden Alfabético. Madrid: Biblioteca Nacional de Madrid. p. 1-16.
Echenique March, Felipe I. 1992. Fuentes para el estudio de los pueblos de naturales de la Nueva España (Mexico: Instituto Nacional de Antropologia e Historia)
García Cubas, Antonio, Diccionario geográfico, histórico y biográfico de los Estados Unidos Mexicanos, edición facsimilar, 5 t., estudio introductorio de Miguel León-Portilla, Aguascalientes, Instituto Nacional de Estadística y Geografía/El Colegio Nacional/Universidad Nacional Autónoma de México, Instituto de Investigaciones Históricas, 2015, ils. 
Gerhard, Peter. 1972. A Guide to the Historical Geography of New Spain. 1 edition. Cambridge Eng.: Cambridge University Press. p. 445-476.
Gerhard, Peter. 1979. The Southeast Frontier of New Spain. Princeton University Press. p. 197-213.
Harvey, H.R. 1972. “The Relaciones Geográficas, 1979-1586: Native Languages.” In Handbook of Middle American Indians, Volume 12: Guide to Ethnohistorical Sources, Part One, edited by Howard F. Cline, 279–323. University of Texas Press.
Moreno Toscano, Alejandra (1968): Geografía económica de México (siglo XVI). Colegio de México. Appendix 4, p. 151-7. 
Starr, Frederick, Aztec Place-Names: Their Meaning and Mode of Composition, (Chicago, 1920) pp. 4-16.

``` 
### How to cite this resource: 
Murrieta-Flores, Patricia, Diego Jiménez-Badillo, Bruno Emanuel da Graça Martins, Mariana Favila-Vázquez, Raquel Liceras-Garrido, and Katherine Bellamy (2020) ‘Digging into Early Colonial Mexico Historical Gazetteer’, Figshare Dataset. doi:10.6084/m9.figshare.12367385.v2.

## Project information: 
The Digging into Early Colonial Mexico: A large-scale computational analysis of 16th century historical sources project uses part of the corpus known as Relaciones Geográficas de la Nueva España – one of the most important colonial historical sources of America – concerned with the territory of Mexico, to create and develop novel computational approaches for the semi-automated exploration of thousands of pages contained in these 16th century documents.

Tackling important historical and methodological questions, and highly demanding challenges in the study of these written sources, we are extracting, analysing, and visualising information that can improve our understanding of this period, and expedite the process by which we study these documents.

Our highly interdisciplinary team is combining techniques from different disciplines, including Corpus Linguistics, Text Mining, Natural Language Processing, Machine Learning, and Geographic Information Systems, to address questions related to the recording of information about indigenous cultures, the Spanish exploration of indigenous social and religious concepts, the appropriation and ideas about place and space in the indigenous world, and their attitudes towards politics and economy. 

### Link to the webpage of the project: 
https://www.lancaster.ac.uk/digging-ecm/

### Some publications by the project:
Murrieta-Flores, P., Jiménez-Badillo, D., Favila-Vazquez, M. (2023-Forthcoming) Placing New Spain through Early Modern Big Data: Developing a Geographical Text Analysis Approach to the Relaciones Geográficas de Nueva España. In Mackenzie Cooley and Huiyi Wu (eds.) Knowing the Empire in Early Modern China and Spain. London: Routledge.

Murrieta-Flores, P., Jiménez-Badillo, D., and Martins, B. (2022) Artificial Intelligence and Computational Approaches to Investigate the History of Early Colonial Mexico. Oxford Research Encyclopedia of Latin American History. DOI: 10.1093/acrefore/9780199366439.013.977

Murrieta-Flores, P., Fávila-Vazquez, M., and Flores-Morán, A. (2021) Indigenous Deep Mapping: A conceptual and representational analysis of space in Mesoamerica and New Spain. In Bodenhammer, D., Corrigan, J., and Harris (Eds.), Making Deep Maps: Foundations, Approaches, and Methods. London: Routledge., p. 78-111. 

Jiménez-Badillo, D., Murrieta-Flores, P., Bruno Martins, B., Gregory, I., Favila-Vázquez, M., Liceras-Garrido, R., & Bellamy, K. (2021).  Análisis histórico-geográfico de documentos novohispanos del siglo XVI mediante técnicas de lingüística computacional y análisis espacial. En D. Jiménez-Badillo (Ed.), Métodos computacionales y técnicas digitales para analizar y divulgar el patrimonio cultural. México: Instituto Nacional de Antropología e Historia. 

Jiménez-Badillo, D., Murrieta-Flores, P., Martins, B., Gregory, I., Favila-Vázquez, M., and Liceras-Garrido, R. (2020) Developing Geographically Oriented NLP Approaches to Sixteenth–Century Historical Documents: Digging into Early Colonial Mexico. Digital Humanities Quarterly, 14 (1). 

Murrieta-Flores, P., Favila-Vázquez, M., and Flores-Morán, A. (2019) ‘Spatial Humanities 3.0: QSR and Semantic Triples as New Means of Exploration of Complex Indigenous Spatial Representations in Sixteenth Century Early Colonial Mexican Maps’. International Journal of Humanities and Arts Computing 13 (1–2): 53–68. https://doi.org/10.3366/ijhac.2019.0231.

Liceras-Garrido, Raquel; Favila-Vázquez, Mariana; Bellamy, Katherine; Murrieta-Flores, Patricia; Jiménez-Badillo, Diego and Martins, Bruno. 2019. Digital Approaches to Historical Archaeology: Exploring the Geographies of 16th Century New Spain. Open Access Journal of Archaeology & Anthropology, Vol. 2, Issue 1. DOI: http://dx.doi.org/10.33552/OAJAA.2019.02.000526

Murrieta-Flores, Patricia; Liceras-Garrido, Raquel; Favila-Vázquez, Mariana; Bellamy, Katherine; Campos, Jorge; Cejuela, Juan Miguel and Martins, Bruno (2020): Training NLP models for the analysis of 16th century Latin American historical documents: Tagtog and the Geographic Reports of New Spain. figshare. Poster. https://doi.org/10.6084/m9.figshare.11806185.v1

### Copyright
(2020) Patricia Murrieta-Flores, Diego Jiménez-Badillo & Bruno Martins
``` 
Licensed under the Creative Commons Attribution-ShareAlike 4.0 International 
(CC BY-SA 4.0) (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   https://creativecommons.org/licenses/by-sa/4.0/

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
``` 


