# Psychart

[![Size](https://img.shields.io/github/repo-size/nicfv/Psychart)](https://github.com/nicfv/Psychart)
[![Marketplace](https://img.shields.io/badge/dynamic/json?logo=grafana&color=F47A20&label=marketplace&prefix=v&query=%24.items%5B%3F%28%40.slug%20%3D%3D%20%22ventura-psychrometric-chart%22%29%5D.version&url=https%3A%2F%2Fgrafana.com%2Fapi%2Fplugins)](https://grafana.com/grafana/plugins/ventura-psychrometric-chart)
[![Downloads](https://img.shields.io/badge/dynamic/json?logo=grafana&color=F47A20&label=downloads&query=%24.items%5B%3F%28%40.slug%20%3D%3D%20%22ventura-psychrometric-chart%22%29%5D.downloads&url=https%3A%2F%2Fgrafana.com%2Fapi%2Fplugins)](https://grafana.com/grafana/plugins/ventura-psychrometric-chart)

View air conditions on a psychrometric chart.

## What is a psychrometric chart?

Psychrometric charts are charts adopted by [ASHRAE](https://www.ashrae.org/) that plot various thermodynamic properties of air-vapor mixtures. These charts are particularly useful in HVAC applications. The following 4 properties are plotted by Psychart:

- Dry Bulb
  - The temperature of air using a dry thermometer.
- Wet Bulb
  - Wet bulb temperature can be practically explained by the temperature of a surface where water is evaporating.
- Dew Point
  - Water will condense from the air at or below this temperature.
- Relative Humidity
  - A ratio of vapor pressure in the air to the saturation vapor pressure. 0%rh indicates absolutely dry air, and 100%rh indicates saturated air.

Other thermodynamics properties can be derived but are not displayed in Psychart. These include but are not limited to:

- Vapor Pressure
- Humidity Ratio
- Enthalpy
- Specific Volume

## Getting started

This section will go over the options in the panel editor.

### Panel options

This is the default panel options for all Grafana panels which gives the user access to the panel title and description and other UI effects.

### Chart options

These options affect how the chart itself is displayed.

Allows the user to select whether measurements are being reported in US or SI units, the local altitude, graph bounds, and optionally display ASHRAE comfort regions. These comfort regions follow the 2021 ASHRAE standard and are designed for data centers and IT spaces of various criticality.

### Data options

These options help process the incoming data.

Psychart is capable of plotting 1 time series per panel for which two numeric time-dependent fields are required. The user must select whether those two fields are dry bulb and wet bulb, dry bulb and dew point, or dry bulb and relative humidity. These fields must then be entered into the field selectors below respectively.

It is important to note that one or two queries may be necessary depending on the data structure. One single query may be sufficient to return the two fields needed to fix the state. Other times, one query will be needed to obtain the dry bulb field and another for relative humidity field, for example.

### Display Options

This section changes the visual appearance of data within the chart.

Allows the user to change the point radius, optionally draw a line between adjacent points in time, and select a color gradient for the data series.

## Errors & Troubleshooting

Some errors can arise from the [Data options](#data-options) section due to the fact that wet bulb and dew point must be less than or equal to the dry bulb temperature and relative humidity must be within the range of 0-1. If relative humidity is a driving measurement, make sure that the measurement type is correct (0-1 or 0%-100%). For other measurements, make sure that they are being reported correctly.

Psychart matches up values with similar timestamps. For a dry bulb & relative humidity series, the dry bulb measurement timestamp must match that of the relative humidity timestamp in order to be recognized as a single point. The _Query options_ in the query inspector may provide the tools required to fix any time discrepancies.

Importantly, if there is missing data in one field, for example if dry bulb temperature has not been reporting for the last 5 minutes, no new data is plotted in Psychart for the last 5 minutes to avoid the display of inaccurate data.

## Screenshots

![screenshot](src/img/screenshot.png)

## License

Psychart is distributed under the [Apache 2.0 License](LICENSE).