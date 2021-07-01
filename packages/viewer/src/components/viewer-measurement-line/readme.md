# vertex-viewer-measurement-line



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                                                             | Type     | Default          |
| ----------- | ------------ | ----------------------------------------------------------------------- | -------- | ---------------- |
| `capLength` | `cap-length` | A length of the line cap. The line cap is a line at each end of a line. | `number` | `0`              |
| `end`       | --           | A point that specifies the ending point of the line.                    | `Point`  | `Point.create()` |
| `start`     | --           | A point that specifies the starting point of the line.                  | `Point`  | `Point.create()` |


## CSS Custom Properties

| Name                                             | Description                                                   |
| ------------------------------------------------ | ------------------------------------------------------------- |
| `--viewer-measurement-line-end-cap-visibility`   | An CSS visibility value for the cap at the end of the line.   |
| `--viewer-measurement-line-start-cap-visibility` | An CSS visibility value for the cap at the start of the line. |
| `--viewer-measurement-line-stroke`               | An SVG stroke that specifies the color stroke of the line.    |
| `--viewer-measurement-line-stroke-width`         | A CSS length that specifies the width of the line.            |


## Dependencies

### Used by

 - [vertex-viewer-distance-measurement](../viewer-distance-measurement)

### Graph
```mermaid
graph TD;
  vertex-viewer-distance-measurement --> vertex-viewer-measurement-line
  style vertex-viewer-measurement-line fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*