/**!
 * dataReport 1.0.0
 * MIT licensed
 * A project by DaveLee
 */

;(function($,window){

  var DataReport = function(){
    this.id = ('h5_' + Math.random()).replace('.','_');
    this.el = $('<div id="'+ this.id +'" class="h5"></div>').hide();
    this.page = [];
    $('body').append(this.el);

    /**
     * 新增页
     * @param {string} name 组件名称，加入到ClassName中
     * @param {type} text 页内默认文本
     * @return {H5} H5对象
     */
    DataReport.prototype.addPage = function(name,text,pageCfg){
      var page = $('<div class="h5_page section"></div>')

      name && page.addClass('h5_page_' + name);
      text && page.text(text);
      pageCfg && page.css(pageCfg);

      this.el.append(page);
      this.page.push(page);

      if(this.whenPagesAdded && typeof this.whenPagesAdded == 'function'){
        this.whenPagesAdded();
      }

      return this;
    }

    //新增组件
    DataReport.prototype.addComponent = function(name,cfg){
      var config = $.extend({
        type:'base'
      },cfg || {});

      var component;//存储组件元素的变量
      var page = this.page.slice(-1)[0]; //取出当前页

      switch(config.type){
        case 'base':
          component = new H5ComponentBase(name,config);
          break;
        case 'polyline':
          component = new H5ComponentPolyline(name,config);
          break;
        case 'bar':
          component = new H5ComponentBar(name,config);
          break;
        case 'pie':
          component = new H5ComponentPie(name,config);
          break;
        case 'ring':
          component = new H5ComponentRing(name,config);
          break;
        case 'radar':
          component = new H5ComponentRadar(name,config);
          break;
        case 'point':
          component = new H5ComponentPoint(name,config);
          break;
        default:
          component = new H5ComponentBase(name,config);
      }

      page.append(component);

      return this;
    }

    //H5对象初始化
    DataReport.prototype.loader = function(firstPage){
      this.el.fullpage({
        onLeave: function(curPage,nextPage,direction){
          $(this).find('.h5_component').trigger('onLeave');
        },
        afterLoad: function(anchorLink,curPage){
          $(this).find('.h5_component').trigger('onLoad');
        }
      });
      this.page[0].find('.h5_component').trigger('onLoad');
      this.el.show();
      firstPage && $.fn.fullpage.moveTo(firstPage);
    }

    this.loader = typeof H5_loading == 'function' ? H5_loading : this.loader;

    return this;
  }


  /* 柱状图组件 */
  var H5ComponentBar = function(name,cfg){

    var component = new H5ComponentBase(name,cfg); //先创建一个基本图文组件

    $.each(cfg.data,function(idx,item){

      var line = $('<div class="line"></div>');
      var name = $('<div class="name"></div>');
      var bar = $('<div class="bar"></div>');
      var per = $('<div class="per"></div>');
      var innerBarWidth = (item[1] * 100).toFixed(1) + '%';
      var barContent = bar.html('<div class="innerBar" style="width: '+ innerBarWidth +'"><div class="rate"></div></div><div class="per">'+ innerBarWidth +'</div>');

      line.append(name.text(item[0])).append(barContent);

      //定义柱状图的样式
      if(item[2]){
        line.find('.rate').css('background',item[2]);
        line.find('.per').css('color',item[2]);
      }

      //绑定onLoad和onLeave时需要执行的操作
      component.on('onLoad',function(){
        line.find('.rate').css({
          width: '100%',
          transition: 'all 1s '+ (cfg.animateDur || 0) / 1000 +'s',
          webkitTransition: 'all 1s '+ (cfg.animateDur || 0) / 1000 +'s'
        });
        component.find('.per').css({
          opacity: 1,
          transition: 'all 0.5s '+ ((cfg.animateDur || 0) + 1000) / 1000 +'s',
          webkitTransition: 'all 0.5s '+ ((cfg.animateDur || 0) + 1000) / 1000 +'s'
        });
      }).on('onLeave',function(){
        line.find('.rate').css('width',0);
        component.find('.per').css({
          opacity: 0,
          transition: 'all 0.5s 0s',
          webkitTransition: 'all 0.5s 0s'
        });
      });

      component.append(line);
    });

    return component;
  }


  /* 基本图文组件 */
  var H5ComponentBase = function(name,cfg){
    var cfg = cfg || {};
    //组件ID
    var id = ('h5_c_' + Math.random()).replace('.','_');
    //把组件类型名添加到样式中进行标记
    var className = 'h5_component_' + cfg.type;
    //组件基本DOM
    var component = $('<div id="'+ id +'" class="h5_component '+ className +' h5_component_name_' + name + '"></div>');

    cfg.text && component.text(cfg.text);
    cfg.width && component.width(cfg.width/2);
    cfg.height && component.height(cfg.height/2);
    cfg.css && component.css(cfg.css);
    // cfg.bg && component.css('background','url('+ cfg.bg +')');

    //component水平居中
    if(cfg.center && cfg.center === true){
      component.css({
        marginLeft: - cfg.width / 4 + 'px',
        left: '50%'
      });
    }

    if(cfg.onclick && typeof cfg.onclick == 'function'){
      component.on('click',cfg.onclick);
    }

    //component对象接收onLeave和onLoad事件
    component.on('onLoad',function(){
      //设置相对组件的定位
      if(cfg.relativeTo){
        var refer = $('body').find('.h5_component_name_' + cfg.relativeTo);
        var position = {
          left: $(refer)[0].offsetLeft,
          top: $(refer)[0].offsetTop,
        };
        if(cfg.center === true){
          position.left = 0;
        }
        component.css('transform','translate('+ position.left + 'px,' + position.top +'px)');
        cfg.relativeTo = false;
      }

      $(this).removeClass(className + '_leave').addClass(className + '_load');
      setTimeout(function(){
        cfg.animateIn && component.animate(cfg.animateIn,cfg.animateDur || 0);
      },cfg.animateDelay || 0);

      return false;
    }).on('onLeave',function(){
      $(this).removeClass(className + '_load').addClass(className + '_leave');
      cfg.animateOut && component.animate(cfg.animateOut,cfg.animateDur || 0);

      return false;
    });

    return component;
  }


  /* 饼图组件 */
  var H5ComponentPie = function(name,cfg){

    var component = new H5ComponentBase(name,cfg); //先创建一个基本图文组件

    //定义画布宽高
    var w = cfg.width;
    var h = cfg.height;
    var r = w / 2; //半径

    //创建Canvas画布
    var newCanvas = function(){
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      canvas.width = ctx.width = w;
      canvas.height = ctx.height = h;
      component.append(canvas);
      return {
        cns: canvas,
        ctx: ctx
      };
    }

    //底图层
    var cnsObj = newCanvas();
    $(cnsObj.cns).css('z-index',1);

    cnsObj.ctx.beginPath();
    cnsObj.ctx.fillStyle = '#eee';
    cnsObj.ctx.strokeStyle = '#eee';
    cnsObj.ctx.lineWidth = 1;
    cnsObj.ctx.arc(r,r,r,0,2*Math.PI);
    cnsObj.ctx.fill();
    cnsObj.ctx.stroke();


    //数据层
    var cnsObj = newCanvas();
    $(cnsObj.cns).css('z-index',2);

    var colors = ['red','green','blue','darkred','orange']; //默认块颜色
    var sAngle = 1.5 * Math.PI; //设置开始角度在12点钟的位置
    var eAngle = 0; //结束角度
    var aAngle = 2 * Math.PI; //100%圆结束角度(3点钟位置)

    var step = cfg.data.length;


    var textWrap = $('<div class="textWrap"></div>');
    //绘制每个扇形区域
    for(var i = 0;i < step;i ++){
      var item = cfg.data[i];
      var color = item[2] || (item[2] = colors.pop());
      eAngle = sAngle + aAngle * item[1];
      cnsObj.ctx.beginPath();
      cnsObj.ctx.fillStyle = color;
      cnsObj.ctx.strokeStyle = color;
      cnsObj.ctx.lineWidth = 0.1;
      cnsObj.ctx.moveTo(r,r);
      cnsObj.ctx.arc(r,r,r,sAngle,eAngle);
      cnsObj.ctx.fill();
      cnsObj.ctx.stroke();
      sAngle = eAngle;

      //注入文本
      var text = $('<div class="text"></div>');
      var textInner = $('<span class="text-inner"></span>');
      textInner.text(cfg.data[i][0]);
      var rate = $('<span class="rate"></span>');
      rate.text(Math.round((cfg.data[i][1] * 100) * 100) / 100 + '%');
      text.css('opacity',0);
      //文本颜色
      if(cfg.data[i][2]){
        text.css('color',cfg.data[i][2]);
      }

      //创建图例
      var rect = $('<span class="rect"></span>');
      if(cfg.data[i][2]){
        rect.css('background',cfg.data[i][2]);
      }

      //文本定位
      /*var x = r + Math.sin(0.5 * Math.PI - sAngle) * r;
      var y = r + Math.cos(0.5 * Math.PI - sAngle) * r;

      x > w / 2 ? text.css('left',x / 2 + 5) : text.css('right',(w - x) / 2  + 5);
      y > h / 2 ? text.css('top',y / 2  + 5) : text.css('bottom',(h - y) / 2  + 5);*/

      textWrap.append(text.append(rect).append(textInner).append(rate));
    }
    textWrap.css('top',h / 2 + 30);
    component.append(textWrap);


    //动画蒙版层
    var cnsObj = newCanvas();
    $(cnsObj.cns).css('z-index',3).addClass('animateLayer');
    cnsObj.ctx.fillStyle = '#eee';
    cnsObj.ctx.strokeStyle = '#eee';

    //用动画蒙版层执行出场动画
    var draw = function(per){
      cnsObj.ctx.clearRect(0,0,w,h);
      cnsObj.ctx.beginPath();
      cnsObj.ctx.moveTo(r,r);
      if(per == 0){
        cnsObj.ctx.arc(r, r, r, 0, 2 * Math.PI);
      }else{
        cnsObj.ctx.arc(r, r, r, sAngle, sAngle + 2 * Math.PI * per, true);
      }
      cnsObj.ctx.fill();
      cnsObj.ctx.stroke();
      if(per >= 1){
        component.find('.text').css({
          transition: 'all 0s',
          webkitTransition: 'all 0s'
        });
        H5ComponentPie.resort(component.find('.text'));
        component.find('canvas.animateLayer').css('opacity',0);
        setTimeout(function(){
          component.find('.text').css({
            transition: 'all 0.5s',
            webkitTransition: 'all 0.5s'
          });
        },50);
      }
    }

    var textArray = component.find('.text');

    function callback(){
      $.each(textArray,function(idx){
        var delay = parseFloat((cfg.animateDur || 0) / 1000  + 1 + idx * 0.1);
        $(this).css({
          transition: 'all .5s '+ delay +'s',
          webkitTransition: 'all .5s '+ delay +'s',
          opacity: 1
        });
      });
    }

    component.on('onLoad',function(){
      draw(0);
      component.find('canvas.animateLayer').css('opacity',1);
      var s = 0;
      for(var i = 0;i < 100;i ++){
        setTimeout(function(){
          s += 0.01;
          draw(s);
        },i * 10 + (cfg.animateDur || 0));
      }
      callback();

    }).on('onLeave',function(){
      $.each(textArray,function(idx){
        $(this).css({
          transition: 'all .5s 0s',
          webkitTransition: 'all .5s 0s',
          opacity: 0
        });
      });

      setTimeout(function(){
        draw(0);
      },cfg.animateDur || 0);

    });

    return component;
  }

  //文本重排
  H5ComponentPie.resort = function(list){

    //检测相交
    var compare = function(domA,domB){
      var offsetA = $(domA).offset();
      var offsetB = $(domB).offset();

      //保存domA和domB的左右两侧点的投影坐标
      var shadowA_x = [offsetA.left,$(domA).width() + offsetA.left];
      var shadowA_y = [offsetA.top,$(domA).height() + offsetA.top];

      var shadowB_x = [offsetB.left,$(domB).width() + offsetB.left];
      var shadowB_y = [offsetB.top,$(domB).height() + offsetB.top];

      //检测x,y是否相交
      var intersect_x = (shadowA_x[0] > shadowB_x[0] && shadowA_x[0] < shadowB_x[1]) || (shadowA_x[1] > shadowB_x[0] && shadowA_x[1] < shadowB_x[1]);
      var intersect_y = (shadowA_y[0] > shadowB_y[0] && shadowA_y[0] < shadowB_y[1]) || (shadowA_y[1] > shadowB_y[0] && shadowA_y[1] < shadowB_y[1]);

      return intersect_x && intersect_y;
    }

    //重排
    var reset = function(domA,domB){
      if($(domA).css('top') != 'auto'){
        $(domA).css('top',parseInt($(domA).css('top')) + $(domB).height());
      }
      if($(domA).css('bottom') != 'auto'){
        $(domA).css('bottom',parseInt($(domA).css('bottom')) + $(domB).height());
      }
    }

    var willReset = [list[0]];
    $.each(list,function(i,nextDom){
      if(compare(willReset[willReset.length - 1],nextDom)){
        willReset.push(nextDom);
      }
    });

    if(willReset.length > 1){
      $.each(willReset,function(i,curDom){
        if(willReset[i + 1]){
          reset(curDom,willReset[i + 1]);
        }
      });
      H5ComponentPie.resort(willReset);
    }
  }


  /* 散点图组件 */
  var H5ComponentPoint = function(name,cfg){
    var component = new H5ComponentBase(name,cfg); //先创建一个基本图文组件
    var base = cfg.data[0][1]; //基准散点图

    //输出每个散点图
    $.each(cfg.data,function(idx,item){
      var point = $('<div class="point"></div>');
      var name = $('<div class="name">'+ item[0] +'</div>');
      var per = $('<div class="per">'+ (item[1] * 100) + '%' +'</div>');

      point.append(name.append(per));

      //以base为基准的大小缩放比例
      var per = (item[1] / base * 100) + '%';
      point.width(per).height(per);

      //设置散点图样式
      if(item.slice(-1)[0] && item.slice(-1)[0] != {}){
        point.css(item.slice(-1)[0]);
      }

      //设置偏移量
      if(item[2] != undefined && item[3] != undefined){
        point.css({left: item[2],top: item[3]});
      }

      //绑定onLoad和onLeave时需要执行的操作
      component.on('onLoad',function(){
        component.find('.point').eq(0).addClass('point_focus').siblings('.point').removeClass('point_focus');
        //设置出场动画
        if(item.slice(-2)[0] && item.slice(-2)[0] != {}){
          var delay = (item.slice(-2)[0].dur || 500) / 1000 +'s '+ (item.slice(-2)[0].delay || 0) / 1000;
          if(item.slice(-2)[0].animate == 'scaleFade'){
            point.css({
              transform: 'scale(.5)',
              webkitTransform: 'scale(.5)',
              transition: 'all 0s',
              webkitTransition: 'all 0s',
              opacity: 0
            });
            setTimeout(function(){
              point.css({
                transform: 'scale(1)',
                webkitTransform: 'scale(1)',
                opacity: 1,
                transition: 'all '+ delay +'s',
                webkitTransition: 'all '+ delay +'s'
              });
            },cfg.animateDur + 100 || 100);
          }else if(item.slice(-2)[0].animate != 'scaleFade' || !item.slice(-2)[0].animate){
            point.css({
              opacity: 0
            });
            setTimeout(function(){
              point.css({
                opacity: 1,
                transition: 'all '+ delay +'s',
                webkitTransition: 'all '+ delay +'s'
              });
            },cfg.animateDur + 100 || 100);
          }
        }
      }).on('onLeave',function(){
        point.css({
          opacity: 0,
          transition: 'all .5s 0s',
          webkitTransition: 'all .5s 0s'
        });
      });

      //点击散点图添加呼吸效果
      component.on('click','.point',function(){
        $(this).addClass('point_focus').siblings('.point').removeClass('point_focus');
        return false;
      });

      component.append(point);
    });

    return component;
  }


  /* 折线图组件 */
  var H5ComponentPolyline = function(name,cfg){
    var component = new H5ComponentBase(name,cfg); //先创建一个基本图文组件

    //定义画布宽高
    var w = cfg.width;
    var h = cfg.height;

    //创建Canvas画布绘制网格线
    var newCanvas = function(){
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      canvas.width = ctx.width = w;
      canvas.height = ctx.height = h;
      component.append(canvas);
      return ctx;
    }

    var ctx = newCanvas();

    //绘制网格线
    var step = 10;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#AAAAAA';

    //水平网格线 100份 -> 10份
    for(var i = 0;i < step + 1;i ++){
      var y = (h / step) * i;
      ctx.moveTo(0,y);
      ctx.lineTo(w,y);
    }
    //垂直网格线(根据项目个数等份)
    step = cfg.data.length + 1; //网格线左右两端不与项目关联
    var text_w = w / step >> 0;
    for(var i = 0;i < step + 1;i ++){
      var x = (w / step) * i;
      ctx.moveTo(x,0);
      ctx.lineTo(x,h);

      //输出项目文本
      if(cfg.data[i]){
        var text = $('<div class="text"></div>');
        text.text(cfg.data[i][0]);
        text.css({
          width: text_w / 2,
          left: x / 2 + text_w/4,
          color: cfg.data[i][2],
          opacity: 0
        });
        component.append(text);
      }
    }

    //收笔
    ctx.stroke();

    //创建新画布绘制折线图
    var ctx = newCanvas();

    /**
     * 绘制折线图
     * @param  {floot} per 0到1之间，记录折线图的动画状态
     */
    var draw = function(per){
      //清空画布
      ctx.clearRect(0,0,w,h);
      //绘制折线数据
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#ff8878';

      var x = 0;
      var y = 0;
      var row_w = w / (cfg.data.length + 1);
      //画点
      for(var i = 0;i < cfg.data.length;i ++){
        var item = cfg.data[i];
        x = row_w * i + row_w;
        y = h - (item[1] * h * per);
        ctx.moveTo(x,y);
        ctx.arc(x,y,3,0,2*Math.PI);
      }
      //连线
      ctx.moveTo(row_w,h - (cfg.data[0][1] * h * per));
      for(var i = 0;i < cfg.data.length;i ++){
        var item = cfg.data[i];
        x = row_w * i + row_w;
        y = h - (item[1] * h * per);
        ctx.lineTo(x,y);
      }
      ctx.stroke();

      //在点上填充数据(带生长动画)
      for(var i = 0;i < cfg.data.length;i ++){
        var item = cfg.data[i];
        x = row_w * i + row_w;
        y = h - (item[1] * h * per);
        ctx.fillStyle = item[2] ? item[2] : '#595959';
        ctx.font = '24px Arial';
        ctx.fillText((item[1] * per * 100).toFixed(1) + '%',x - 24,y - 20);
      }

      //绘制阴影
      ctx.lineTo(x,h);
      ctx.lineTo(row_w,h);
      ctx.fillStyle = 'rgba(255,136,120,.35)';
      ctx.fill();
    }

    function callback(){
      var textArray = component.find('.text');
      $.each(textArray,function(idx){
        var delay = parseFloat((cfg.animateDur || 0) / 1000  + 1 + idx * 0.1);
        $(this).css({
          transition: 'all .5s '+ delay +'s',
          webkitTransition: 'all .5s '+ delay +'s',
          opacity: 1
        });
      });
    }

    component.on('onLoad',function(){
      //折线图生长动画
      draw(0);
      var s = 0;
      for(var i = 0;i < 100;i ++){
        setTimeout(function(){
          s += 0.01;
          draw(s);
        },i * 10 + (cfg.animateDur || 0));
      }
      callback();
    }).on('onLeave',function(){

      var textArray = component.find('.text');
      $.each(textArray,function(idx){
        $(this).css({
          transition: 'all .5s 0s',
          webkitTransition: 'all .5s 0s',
          opacity: 0
        });
      });

      setTimeout(function(){
        draw(0);
      },cfg.animateDur || 0);
    });

    return component;
  }


  /* 雷达图组件 */
  var H5ComponentRadar = function(name,cfg){
    var component = new H5ComponentBase(name,cfg); //先创建一个基本图文组件

    //定义画布宽高
    var w = cfg.width;
    var h = cfg.height;

    //创建Canvas画布
    var newCanvas = function(){
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      canvas.width = ctx.width = w;
      canvas.height = ctx.height = h;
      component.append(canvas);
      return ctx;
    }

    //创建Canvas画布,绘制背景层
    var ctx = newCanvas();

    var step = cfg.data.length; //项目个数，对应多边形的顶点个数
    //以画布中点为圆心，半径为w/2，画圆
    var r = w / 2;
    //画圆心
    // ctx.beginPath();
    // ctx.arc(r,r,3,0,2*Math.PI);
    // ctx.stroke();
    // 画大圆
    // ctx.beginPath();
    // ctx.arc(r,r,r,0,2*Math.PI);
    // ctx.stroke();

    // 计算多边形的顶点坐标(圆周上的坐标)
    // 已知：圆心坐标(a,b),半径r,角度deg
    // rad = (2 * Math.PI / 360) * (360 / step) * i
    // x = a + Math.sin(rad) * r
    // y = b + Math.cos(rad) * r

    //绘制网格背景(分层绘制，分10份)
    var isBlue = false;
    for(var s = 10;s > 0;s --){
      isBlue = !isBlue;
      ctx.beginPath();
      for(var i = 0;i < step;i ++){
        var rad = (2 * Math.PI / 360) * (360 / step) * i;
        var x = r + Math.sin(rad) * r * (s / 10);
        var y = r + Math.cos(rad) * r * (s / 10);
        // 画多边形顶点
        // ctx.arc(x,y,3,0,2*Math.PI);
        ctx.lineTo(x,y);
      }
      ctx.closePath();
      ctx.fillStyle = isBlue ? '#99c0ff' : '#f1f9ff';
      ctx.fill();
    }

    //绘制伞骨
    for(var i = 0;i < step;i ++){
      var rad = (2 * Math.PI / 360) * (360 / step) * i;
      var x = r + Math.sin(rad) * r;
      var y = r + Math.cos(rad) * r;
      ctx.moveTo(r,r);
      ctx.lineTo(x,y);

      //输出项目文字
      var text = $('<div class="text"></div>');
      var rate = Math.round(cfg.data[i][1] * 10000) / 100 + '%';
      text.text(cfg.data[i][0] + rate);
      text.css('opacity',0);
      x > w / 2 ? text.css('left',x / 2 + 2) : text.css('right',(w - x) / 2 + 2);
      y > h / 2 ? text.css('top',y / 2 + 2) : text.css('bottom',(h - y) / 2 + 2);
      component.append(text);
    }
    ctx.strokeStyle = '#d2d2d2';
    ctx.stroke();

    //创建新Canvas画布,绘制数据层
    var ctx = newCanvas();

    var draw = function(per){
      //输出数据折线
      ctx.clearRect(0,0,w,h);
      ctx.beginPath();
      for(var i = 0;i < step;i ++){
        var rad = (2 * Math.PI / 360) * (360 / step) * i;
        var rate = cfg.data[i][1] * per;
        var x = r + Math.sin(rad) * r * rate;
        var y = r + Math.cos(rad) * r * rate;
        ctx.lineTo(x,y);
        ctx.arc(x,y,2,0,2*Math.PI);
      }
      ctx.closePath();
      ctx.fillStyle = 'rgba(255,136,120,.5)';
      ctx.fill();
      ctx.strokeStyle = '#ff8878';
      ctx.stroke();
    }


    var textArray = component.find('.text');

    function callback(){
      $.each(textArray,function(idx){
        $(this).css({
          transition: 'all .5s '+ parseFloat((cfg.animateDur || 0) / 1000  + 1 + idx * 0.1) +'s',
          webkitTransition: 'all .5s '+ parseFloat((cfg.animateDur || 0) / 1000  + 1 + idx * 0.1) +'s',
          opacity: 1
        });
      });
    }

    component.on('onLoad',function(){
      draw(0);
      //折线图生长动画
      var s = 0;
      for(var i = 0;i < 100;i ++){
        setTimeout(function(){
          s += 0.01;
          draw(s);
        },i * 10 + (cfg.animateDur || 0));
      }
      callback();
    }).on('onLeave',function(){

      $.each(textArray,function(idx){
        $(this).css({
          transition: 'all .5s 0s',
          webkitTransition: 'all .5s 0s',
          opacity: 0
        });
      });

      setTimeout(function(){
        draw(0);
      },cfg.animateDur || 0);
    });

    return component;
  }


  /* 环图组件 */
  var H5ComponentRing = function ( name, cfg ) {

    if(cfg.data.length > 1){
      //把数据格式化为只有一项
      cfg.data = [cfg.data[0]];
    }

    //重设配置中的 type 参数，不仅利用 H5ComponentPie 构建 DOM 结构和 JS 逻辑，也使用其 CSS 样式定义
    cfg.type = 'pie';
    var component =  new H5ComponentPie(name,cfg);

    //修正组件的样式，以支持在样式文件中组件的样式定义
    component.addClass('h5_component_ring');

    var mask = $('<div class="mask">');

    //把创建好的遮罩元素添加到组件中
    component.append(mask);

    component.find('.rect').remove();

    var text = component.find('.text');
    var rate = text.find('.rate');

    text.attr('style','');
    if(cfg.data[0][2]){
      text.css('color',cfg.data[0][2]);
    }
    //在遮罩元素( .mask ) 中添加文本信息
    text.css({
      opacity: 0,
      margin: 0
    });
    rate.css({
      display: 'block'
    });
    mask.append(text);

    return component;
  }

  window['DataReport'] = DataReport;

})(jQuery,window);

