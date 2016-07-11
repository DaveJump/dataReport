$(function(){

    var dataReport = new DataReport();

    dataReport.whenPagesAdded = function(){
        this.addComponent('footer',{
            text: '上下滑动观看',
            css: {
                width: '100%',
                height: 20,
                bottom: 0,
                left: 0,
                opacity: 0,
                zIndex: 1000,
                color: '#fff',
                fontSize: '12px',
                textAlign: 'center',
                background: 'rgba(0,0,0,.5)'
            },
            animateIn: {
                opacity: 1
            },
            animateOut: {
                opacity: 0
            },
            animateDur: 500
        });
    }

    dataReport
        .addPage('face','',{background: 'url(imgs/face_bg.png) center no-repeat'})
        .addComponent('logo',{
            width: 660,
            height: 300,
            center: true,
            css: {
                background: 'url(imgs/face_title.png) center no-repeat',
                opacity: 0,
                top: 50
            },
            animateIn: {
                top: 100,
                opacity: 1
            },
            animateOut: {
                top: 50,
                opacity: 0
            },
            animateDur: 500
        })
        .addComponent('face_img_left',{
            width: 370,
            height: 493,
            css: {
                background: 'url(imgs/face_img_left.png) center left no-repeat',
                opacity: 0,
                left: '-50px',
                bottom: '-50px'
            },
            animateIn: {
                opacity: 1,
                left: 0,
                bottom: 0
            },
            animateOut: {
                opacity: 0,
                left: '-50px',
                bottom: '-50px'
            },
            animateDur: 500,
            animateDelay: 500
        })
        .addComponent('face_img_right',{
            width: 276,
            height: 449,
            css: {
                background: 'url(imgs/face_img_right.png) center right no-repeat',
                opacity: 0,
                right: '-50px',
                bottom: '-50px'
            },
            animateIn: {
                opacity: 1,
                right: 0,
                bottom: 0
            },
            animateOut: {
                opacity: 0,
                right: '-50px',
                bottom: '-50px'
            },
            animateDur: 500,
            animateDelay: 500
        })
        .addPage()
        .addComponent('caption',{text: '近几年总体网民规模'})
        .addComponent('msg',{
            text: '我国网民总体规模不断增大',
            css: {
                opacity: 0,
                bottom: '22%',
                textAlign: 'center',
                width: '100%',
                color: '#ff7676',
                fontSize: '20px'
            },
            animateIn: {
                opacity: 1
            },
            animateOut: {
                opacity: 0
            },
            animateDur: 500
        })
        .addComponent('bar',{
            type : 'bar',
            width : 800,
            height : 300,
            center : true,
            data: [
                ['2014年6月',0.469,'#ff7676'],
                ['2013年12月',0.458,'#99c0ff'],
                ['2013年6月',0.441,'#99c0ff'],
                ['2012年12月',0.421,'#99c0ff'],
                ['2012年6月',0.399,'#99c0ff'],
                ['2011年12月',0.383,'#99c0ff'],
                ['2011年6月',0.362,'#99c0ff'],
                ['2010年12月',0.343,'#99c0ff'],
                ['2010年6月',0.318,'#99c0ff']
            ],
            css: {top: '20%',opacity: 0},
            animateIn: {
                top: '28%',
                opacity: 1
            },
            animateOut: {
                top: '20%',
                opacity: 0
            },
            animateDur: 500
        })
        .addPage()
        .addComponent('caption',{text: '手机网民规模'})
        .addComponent('msg',{
            text: '手机网民规模占网民比例不断扩大',
            css: {
                opacity: 0,
                bottom: '22%',
                textAlign: 'center',
                width: '100%',
                color: '#ff7676',
                fontSize: '20px'
            },
            animateIn: {
                opacity: 1
            },
            animateOut: {
                opacity: 0
            },
            animateDur: 500
        })
        .addComponent('bar',{
            type : 'bar',
            width : 750,
            height : 300,
            center : true,
            data: [
                ['2014年6月',0.834,'#ff7676'],
                ['2013年12月',0.810, '#99c0ff'],
                ['2013年6月',0.785,'#99c0ff'],
                ['2012年12月',0.745, '#99c0ff'],
                ['2012年6月',0.722,'#99c0ff'],
                ['2011年12月',0.693, '#99c0ff'],
                ['2011年6月',0.655,'#99c0ff'],
                ['2010年12月',0.662,'#99c0ff'],
                ['2010年6月',0.659,'#99c0ff']
            ],
            css: {top: '20%',opacity: 0},
            animateIn: {
                top: '28%',
                opacity: 1
            },
            animateOut: {
                top: '20%',
                opacity: 0
            },
            animateDur: 500
        })
        .addPage()
        .addComponent('caption',{text: '我国网民城乡结构'})
        .addComponent('msg',{
            text: '城镇',
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
        .addComponent('ring',{
            type : 'ring',
            width : 250,
            height : 250,
            data:[
                ['2013年12月',0.714,'#0099CC']
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
        .addComponent('ring',{
            type : 'ring',
            width : 250,
            height : 250,
            data:[
                ['2014年6月',0.718,'#ff7676']
            ],
            css: {
                top: '20%',
                left: '60%',
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
        .addComponent('msg',{
            text: '乡村',
            css: {
                opacity: 0,
                top: '58%',
                left: '-5%',
                textAlign: 'center',
                width: '60px',
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
        .addComponent('ring',{
            type : 'ring',
            width : 250,
            height : 250,
            data:[
                ['2013年12月',0.286,'#0099CC']
            ],
            css: {
                top: '45%',
                left: '20%',
                opacity: 0,
                fontSize: '18px',
                lineHeight: '1.5em'
            },
            animateIn:{
                opacity: 1,
                top: '50%',
            },
            animateOut:{
                opacity: 0,
                top: '45%',
            },
            animateDur: 500
        })
        .addComponent('ring',{
            type : 'ring',
            width : 250,
            height : 250,
            data:[
                ['2014年6月',0.282,'#ff7676']
            ],
            css: {
                top: '45%',
                left: '60%',
                opacity: 0,
                fontSize: '18px',
                lineHeight: '1.5em'
            },
            animateIn:{
                opacity: 1,
                top: '50%',
            },
            animateOut:{
                opacity: 0,
                top: '45%',
            },
            animateDur: 500
        })
        .addComponent('msg',{
            text: '城镇网民占比略微上升，乡村则略有下降',
            css: {
                opacity: 0,
                bottom: '18%',
                textAlign: 'center',
                width: '100%',
                fontSize: '18px'
            },
            animateIn: {
                opacity: 1
            },
            animateOut: {
                opacity: 0
            },
            animateDur: 500,
            animateDelay: 500
        })
        .addPage()
        .addComponent('caption',{text: '2014年网民年龄结构'})
        .addComponent('msg',{
            text: '其中20-29岁网民占比最大',
            css: {
                opacity: 0,
                top: '32%',
                textAlign: 'center',
                width: '100%',
                color: '#ff7676',
                fontSize: '20px'
            },
            animateIn: {
                opacity: 1
            },
            animateOut: {
                opacity: 0
            },
            animateDur: 500
        })
        .addComponent('polyline',{
            type : 'polyline',
            width : 650,
            height : 400,
            center : true,
            data: [
                ['10岁以下',0.021],
                ['10-19岁',0.245],
                ['20-29岁',0.307,'#ff8878'],
                ['30-39岁',0.234],
                ['40-49岁',0.12],
                ['50-59岁',0.052],
                ['60岁以上',0.021]
            ],
            css: {top: '30%',opacity: 0},
            animateIn: {
                top: '42%',
                opacity: 1
            },
            animateDur: 500,
            animateOut: {
                top: '30%',
                opacity: 0
            }
        })
        .addPage()
        .addComponent('caption',{text: '2014年网民学历结构'})
        .addComponent('msg',{
            text: '其中大学以上学历网民占比最大',
            css: {
                opacity: 0,
                bottom: '10%',
                textAlign: 'center',
                width: '100%',
                color: '#ff7676',
                fontSize: '20px'
            },
            animateIn: {
                opacity: 1
            },
            animateOut: {
                opacity: 0
            },
            animateDur: 500
        })
        .addComponent('pie',{
            type : 'pie',
            width : 400,
            height : 400,
            center : true,
            data: [
                ['小学以下',0.09,'#ff7676'],
                ['初中',0.11,'#5ddbd8'],
                ['高中',0.18,'#99c0ff'],
                ['中专/技校',0.22,'#ffad69'],
                ['大专以上',0.40,'#0099CC']
            ],
            css: {top: '15%',opacity: 0},
            animateIn: {
                top: '22%',
                opacity: 1
            },
            animateOut: {
                top: '15%',
                opacity: 0
            },
            animateDur: 500
        })
        .addPage()
        .addComponent('caption',{text: '上网设备占比'})
        .addComponent('msg',{
            text: '其中用手机上网的网民占比最大',
            css: {
                opacity: 0,
                top: '30%',
                textAlign: 'center',
                width: '100%',
                color: '#ff7676',
                fontSize: '20px'
            },
            animateIn: {
                opacity: 1
            },
            animateOut: {
                opacity: 0
            },
            animateDur: 500
        })
        .addComponent('radar',{
            type : 'radar',
            width : 400,
            height : 400,
            center : true,
            data: [
                ['台式',0.69],
                ['笔记本',0.44],
                ['平板',0.53,'#ff8878'],
                ['手机',0.83,'#ff8878'],
                ['传统PC',0.81],
            ],
            css: {top: '40%',opacity: 0},
            animateIn: {
                top: '45%',
                opacity: 1
            },
            animateOut: {
                top: '40%',
                opacity: 0
            },
            animateDur: 500
        })
        .addPage('tail')
        .addComponent('logo',{
            width: 600,
            height: 300,
            center: true,
            css: {
                background: 'url(imgs/tail_title.png) center no-repeat',
                top: 150,
                opacity: 0
            },
            animateIn: {
                opacity: 1,
                top: 200,
            },
            animateOut: {
                opacity: 0,
                top: 150,
            },
            animateDur: 500
        })
        .addComponent('slogan',{
            width: 600,
            height: 100,
            center: true,
            css: {
                background: 'url(imgs/tail_slogan.png) center no-repeat',
                top: 360,
                opacity: 0
            },
            animateIn: {
                opacity: 1,
                top: 310,
            },
            animateOut: {
                opacity: 0,
                top: 360,
            },
            animateDur: 500,
            animateDelay: 500
        })
        .addComponent('share',{
            width: 128,
            height: 120,
            css: {
                background: 'url(imgs/tail_share.png) center no-repeat',
                top: 10,
                right: 10,
                opacity: 0
            },
            animateIn: {
                opacity: 1,
                top: 5,
                right: 5
            },
            animateOut: {
                opacity: 0,
                top: 10,
                right: 10
            },
            animateDur: 500,
            animateDelay: 500
        })
        .addComponent('back',{
            width: 52,
            height: 50,
            center: true,
            css: {
                background: 'url(imgs/tail_back.png) center no-repeat',
                top: 10
            },
            onclick: function(){
                $.fn.fullpage.moveTo(1);
            }
        })

        .loader(['imgs/face_bg.png','imgs/face_title.png','imgs/page_bg.png','imgs/face_img_left.png','imgs/face_img_right.png','imgs/tail_title.png','imgs/tail_slogan.png','imgs/tail_share.png','imgs/tail_back.png']);

    $('.h5_page_tail').find('.h5_component_name_footer').remove();

});
