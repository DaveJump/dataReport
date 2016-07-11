# dataReport
a fullpage plugin for simple data statistical report based on jquery and fullpage.js
# usage  
### load the resources  
```
<head>
  <link rel="stylesheet" href="css/dataReport.css">
</head>
<body>
  ...
  <script src="js/dataReport.js"></script>
  <script>
    var dataReport = new DataReport();
  </script>
</boby>
```  
**You must load jquery and fullpage.js before you load these resources**  

### API  
* addPage()
```
dataReport.addPage(pageName[string],pagetext[string],pagebackground[urlRegular]);

//the arguments are optional
//example: dataReport.addPage('facePage','this is facepage','url(images/face.png) center no-repeat')
```  
* addComponent()  
```
dataReport.addPage().addComponent(componentName[string],config[object]);

//the arguments are required
//example: dataReport.addPage().addComponent('caption',{
  text: 'this is a caption',
  width: 200,
  height: 100,
  ...
});
```  
### config  

* `text[string]`  
  the component inner text  
  
* `width,height[number or string]`  
  the component's width and height.When you use it on mobile,please use double value,so it can fetch the Retina screen  

* `type[string]`  
  the type of component.  
  `'base'[default],'bar','point','polyline','pie','ring','radar'`  
  choose your favourite type  
  
* `data[array]`  
  if your component is not the 'base' component,you must add this config  
  your data config must like `['desc',rate[number][,color optional]]`
  
* `center[boolean]`  
  force the component to set to horizontal center 

* `css[object]`  
  the style of the component.You can use it just like you use jquery's css API  

* `animateIn[object]`  
  style after this component animated in  
  
* `animateOut[object]`  
  style after this component animated out  

* `animateDur[number/ms]`  
  animation duration  
  
* `animateDelay[number/ms]`  
  animation delay  
  
### A complete demo  
```
dataReport
.addPage()
  .addComponent('caption',{text: 'cation text'})
  .addComponent('msg',{
    text: 'city',
    css: {
        opacity: 0,
        top: '33%',
        textAlign: 'center',
        width: '60px',
        left: '-5%',
        fontSize: '18px'
    },
    animateIn: {
        opacity: 1,
        left: '1%'
    },
    animateOut: {
        opacity: 0,
        left: '-5%'
    },
    animateDur: 500
  })
  .addComponent('pie',{
      type : 'ring',
      width : 250,
      height : 250,
      data:[
          ['2013/12',0.5,'#0099CC'],
          ['2014/5',0.2,'#ff7676'],
          ['2015/8',0.3,'#0099CC']
      ],
      css: {
          top: '20%',
          left: '20%',
          opacity: 0,
          fontSize: '18px',
          lineHeight: '1.5em'
      },
      animateIn:{
          opacity: 1,
          top: '25%',
      },
      animateOut:{
          opacity: 0,
          top: '20%',
      },
      animateDur: 500
  })
.addPage('footerPage')
  .addComponent(...)
  .addComponent(...)
...
```
  



