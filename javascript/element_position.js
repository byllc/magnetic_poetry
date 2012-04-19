function getPositionById(id)
{    
	element = document.getElementById(id)
	x = element.style.top
	y = element.style.left        
	
	return [x,y]
}

function get_mouse_x(e) {
	var posx = 0;
	if (!e) var e = window.event;
	if (e.pageX )
	 {
		posx = e.pageX	
	 }
	else if (e.clientX)    
	{
		posx = e.clientX + document.body.scrollLeft
			+ document.documentElement.scrollLeft;
	}

	return posx;
}   
                

function get_mouse_y(e)
{
 	var posy = 0;
	if (!e) var e = window.event;
	if (e.pageY )
	 {
		posy = e.pageY	
	 }
	else if (e.clientY)    
	{
		posx = e.clientY + document.body.scrollTop
			+ document.documentElement.scrollTop;
	}

	return posy;   
}
