# DECM_Gazetteer -COMING IN 2021!

## Project information: 
The Digging into Early Colonial Mexico: A large-scale computational analysis of 16th century historical sources project uses part of the corpus known as Relaciones Geográficas de la Nueva España – one of the most important colonial historical sources of America – concerned with the territory of Mexico, to create and develop novel computational approaches for the semi-automated exploration of thousands of pages contained in these 16th century documents.

Tackling important historical and methodological questions, and highly demanding challenges in the study of these written sources, we are extracting, analysing, and visualising information that can improve our understanding of this period, and expedite the process by which we study these documents.

Our highly interdisciplinary team is combining techniques from different disciplines, including Corpus Linguistics, Text Mining, Natural Language Processing, Machine Learning, and Geographic Information Systems, to address questions related to the recording of information about indigenous cultures, the Spanish exploration of indigenous social and religious concepts, the appropriation and ideas about place and space in the indigenous world, and their attitudes towards politics and economy. 

### Link to the webpage of the project: 
[https://www.lancaster.ac.uk/digging-ecm/]

### How to cite this resource: 
``` 
Murrieta-Flores, P., Jiménez-Badillo, D., Martins, B., Favila-Vázquez, M., and Liceras-Garrido, R. (2020) 
DECM Historical Gazetteer. T-AP Digging into Early Colonial Mexico Project. Figshare, Dataset. 
DOI:
```
### Gazetteer Description: 
The DECM Historical Gazetteer is a digital gazetteer of historical places in Mexico available in different formats and built from detailed research. This includes a 16th century version (The DECM 16th Century Gazetteer) with the toponyms mentioned in primary sources including the Relaciones Geográficas (1577-1585) and the Suma de Visitas de los Pueblos de la Nueva España (1548-1550), as well as information on the political, religious and administrative units of the Viceroyalty of New Spain. The gazetteer is composed of 71 main files with geographic information of colonial provinces, alcaldias, corregimientos, diocesis, among many others, as well as thousands of historical cities, towns, villages, and other places. This is integrated in an interoperable model containing thousands of historical locations with alternative spelling place-name variations. The dataset also includes 30 tables with additional historical information related to toponyms, languages, repositories, maps, etc.

There are two versions of the DECM Historical Gazetteer: 1) The DECM Gazetteer, and 2) The DECM_16thC_Gazetteer.

This is the DECM Gazetteer and this version includes all the researched historical toponyms contained in primary and secondary sources. The information is organised by RG volume. It also includes layers and tables of historical information digitised and/or created by the project from secondary sources. 

This set is composed by GIS shapefiles & Linked Places format information with: a) all toponyms with coordinates, mentioned and disambiguated from the primary sources (13 volumes) and secondary sources (3 volumes); b) 30 geographical layers of additional historical information derived from secondary sources; c) 32 tables with other important historical information related to the RGs; and d) the DECM Gazetteer Registry.

### Content: 
``` 
1. DECM_Gazetteer_primarysources: Contains 17 shapefiles (points and polygons) with historical geographies. They have 
been created from the indexes of the edited volumes of the Relaciones Geográficas de la Nueva España and Yucatán 
published by Acuña, De la Garza, and the Suma de Visita de los Pueblos by Del Paso y Troncoso (see sources used) 
disambiguated and atomized in a spatial database. Each shapefile include the following attributes: ID, Place name, 
Alternative Names, Modern Name, References, Location, Confidence Degree, ID of a related location, Relationship shared, 
Location Type, Type Thesaurus URL, Coord X, Coord Y, Time spam URL, Start date, End date. Every shapefile includes 
metadata.

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

2. DECM_Gazetteer_secondarysources: Contains 4 shapefiles (points and polygons) with historical information mentioned 
and collected from 4 secondary sources. They have been created by digitising and disambiguating the places mentioned 
in the sources (see sources used):

        MorenoToscano_i08.shp
        Gerhard_NewSpain.shp
        Gerhard_SEFrontier_polygons.shp
        Gerhard_SEFrontier.shp

3. DECM_Additional_Information: Contains 49 shapefiles (points and polygons) with additional information on historical 
geographies. They have been created by digitising historical studies on 16th century Colonial History of Mexico.

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

4. DECM_Tables: Cointains 2 folders with additional tabular data with relevant information about 16th century colonial 
Mexico in two formats: csv and xlsx

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


5. Documents:

a) DECM_Gazetteer_Disambiguation_Percentage.xlsx - Excel document with the total amount of place names included in the 
Relaciones Geográficas de Nueva España and Yucatán, places disambiguated with X and Y coordinates and without. 

b) DECM_Gazetteer_Registry.xlsx: Excel file with a list of all the information of sources and attibutes included in DECM_Gazetteer_primarysources, DECM_Gazetteer_secondarysources, DECM_Additional_Information, and DECM_Tables.

c) Souces_for_the_Disambiguation - Word file with the bibliographical references used to locate the place names in the DECM_Gazetteer_primarysources folder.

``` 
### Sources Used:

1. Primary Sources
	1. Acuña, René. 1984. Relaciones Geográficas del siglo XVI: Antequera. Tomo primero. 1 edition. México: Universidad Autónoma de México, Imprenta Universitaria.
	
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
