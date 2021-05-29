## props

- fullWidth: with same width of container
- margin:
  - normal/dense add margin vertically against container and other components, dense margin is a half of normal as well as height of input
- multiline: bool
    - render textarea (turn lines) indead of input
  * rows: number/string
    * set rows when multiline is true
  * rowsMax
- required: bool
  - required field with * after label
- select: bool
    - render select instead of input and must have children props
  * children: node(component)
    * render select items
- helperText: node
  - add node after input
- inputLableProps: object
  - add attributes to label https://material-ui.com/api/input-label/
- variant: filled | outlined | standard
  - the variant of input