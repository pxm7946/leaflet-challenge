# leaflet-challenge

Visualizing earthquakes that have occurred over a week can help prepare for future events like those, especially if they are occurring nearby. Indicating the magnitude, depth, and the location is also helpful, which have been displayed in the map as well. In order to get this data in the first place, the earthquake.usgs.gov website had to be visited in order to select the dataset and import it into the Leaflet JavaScript file. Once this has been done, the features for a gray map were written so that the earthquake markers could later be displayed in color. An API key had to be retrieved from mapbox.com so that the map could be called in to the file. Because the dataset is from the United States, the view was set at the center of the country. Once the map was loaded and the datset was retrieved, the markers were created. 

Based on the data, I indicated yellow to be earthquakes that have a magnitude between -10 to 10, and red to be earthquakes with a magnitude of 90+, with a range of colors in increments of 20. The default color is a light blue. The size of the bubble also indicates how low or high the magnitude of the earthquake is. When the user hovers over a specific bubble, the magnitude, depth, and location is shown. A screenshot has been provided beow as reference.

![Screen Shot 2022-02-04 at 4 04 43 PM](https://user-images.githubusercontent.com/72631173/152620237-78c187ad-a351-4e02-b3f2-550278730197.png)


I believe the data from the imported datset changes every week, which means the data will be subject to change. Besides the calling of the API key, the retrieval of the datset, the display of the earthquake markers (both color and size), a legend was also created. The map is interactive, and can be zoomed in or out as the user prefers.
