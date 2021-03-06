var H5_loading = function(images,firstPage){

  var loadingLayer = $('.loading');
  var id = this.id;

  loadingLayer.show();

  if(this._images === undefined ){ //  第一次进入
      this._images = ( images || [] ).length;
      this._loaded = 0 ;
      window[id] = this;      //   把当前对象存储在全局对象 window 中，用来进行某个图片加载完成之后的回调
      for(s in images){
          var item = images[s];
          var img = new Image;
          img.onload = function(){
              window[id].loader();
          }
          img.src = item;
      }
      $('#rate').text('0%');
      return this;
  }else{
      this._loaded ++ ;
      $('#rate').text( ( ( this._loaded / this._images  *100) >> 0 ) + '%' );
      if(this._loaded < this._images){
          return this;
      }
  }

  window[id] = null;

  loadingLayer.hide();

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
