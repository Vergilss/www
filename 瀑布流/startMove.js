function startMove(elem, json, fn){
	
	clearInterval(elem.timer);
	// 运动
	var move = function(){
		var flag = true;//假设每一个属性都到达了目标值
		// 当for循环结束之后，flag依然为真时，才能够说，所有的属性都到达目标值了
		// 只要有1个属性没有到达目标值，flag就是假
		for( var attr in json ){
			// 目标值
			var target = json[attr];
			// 当前属性值
			var v = getComputedStyle(elem)[attr];
			// 去掉单位
			if( attr=="opacity" ){
				v = Math.round(v*100);
			}else{
				v = parseInt(v);
			}
			// 求目标值与当前值的间距
			var dist = target-v;
			// 求步长
			var step = dist/6;
			if( step>0 ){
				step = Math.ceil(step);
			}else{
				step = Math.floor(step);
			}
			//console.log( v+" + "+step );
			// 更新
			if( attr=="opacity" ){
				elem.style[attr] = (v+step)/100;
			}else{
				elem.style[attr] = v+step+"px";
			}
			// 只要有1个属性没有到达目标值，更新flag为假。
			if( target!=v ){
				flag = false;
			}			
		}
		// 如果所有的属性都到达了目标值，则定时器关闭
		if( flag ){
			clearInterval(elem.timer);
			if( fn ){
				fn();
			}
		}
	}
	
	// 定时器
	elem.timer = setInterval(move, 50);
}	