### Components Upcoming Features:

##### Posts Collection Component:

  perPage: 10 (default),
  type: post (default),
  featuredImage: [large, medium, small, off], medium (default)
  showExcerpt: true (default),
  showMore: [scroll, button, off], button (default),
  showAuthor: true (default),
  showDate: true (default)
  
  Example: `<posts [perPage]="" [type]="" [featuredImage]="medium" [showExcerpt]="true" [showMore]="true" ></posts>`
  

  
##### Category Collection Component

  perPage: 10 (default),
  showMore: [scroll, button, off], button (default),
`<cats [perPage]="" [showMore]="true" ></cats>` : a collection of categories

##### Tags Collection arguments

`<tags [perPage]="" [showMore]="true" ></tags>` : a collection of tags

##### Author Collection Component

`<tags [perPage]="" [showMore]="true" ></tags>` : a collection of authors