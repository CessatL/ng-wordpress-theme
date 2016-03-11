### Components Planned Features:

##### Collection Component:

  Get wordpress collection object.
  
  **Inputs**:
  wp
  args: array of query args
  mode: {scroll, button, pagination}, button (default),
  config: {
    showFeaturedImage: { imageSize, false }: medium (default),
    showExcerpt: true (default),
    showAuthor: true (default),
    showDate: true (default),
    showCats: true (default),
    showTags: false (default)  
  {
  
  **Usage**:
  `<collection [wp]="posts" [args]="{perPage: 6, page: 1}" [showFeaturedImage]="medium" [showExcerpt]="true" [mode]="scroll" ></posts>`
  

  
##### Single Component

  Get a single wordpress object.
  
  **Input**:
  wp,
  args: array of query args,
  config: {
    showFeaturedImage: { imageSize, false }: medium (default),
    showExcerpt: true (default),
    showAuthor: true (default),
    showDate: true (default),
    showCats: true (default),
    showTags: false (default)
  }
  
  **Usage**:
 `<single [wp]="author" [args]="{slug: harry-potter}" [config]="{ ... }"  ></single>`

