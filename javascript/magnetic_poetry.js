
magnet_array = new Array; 
current_magnet = "";   
fridge_width = "";    
fridge_height = "";

function magnet(element_id)
{  
	if(element_id != 0 )
	{
	pos_array = getPositionById(element_id)                    
	this.xpos = pos_array[0]
	this.ypos = pos_array[1]      
	this.id = element_id      
	this.word = element
    }
}  

function create_magnets_from_text(id)
{
	fridge = document.getElementById(id);
	magnets = fridge.innerHTML.split(" "); 
	
	word_match = /\w/;
	for(i=0;i < magnets.length; i++)
	{                                    
		  
	       if(magnets[i].match(word_match) )
	       {
	        magnets[i] = "<span class='magnet'>" + magnets[i] + "</span>"; 
      		}
	  } 
	 
	fridge.innerHTML = magnets.join(" ");
	generate_magnets_by_class("magnet",id);
}
  

function move_magnet(e)
{         
	if(current_magnet != "")
	{                                                                             	
	current_magnet.onselectstart = function () { return false; }  	
		
    x_pos = get_mouse_x(e);
    y_pos = get_mouse_y(e);
     
	//make sure the new values are within the boundaries of the container
	//if(x_pos > fridge_width){  x_pos = (fridge_width - 50); }        
	//if(y_pos > fridge_height){ y_pos = (fridge_height - 20); }
	                   
    current_magnet.style.top = y_pos - 15;
    current_magnet.style.left = x_pos - 30;    
    return false;
	}
}   

function lift_magnet(id,e)
{
	
	current_magnet = document.getElementById(id);  
	current_magnet.onselectstart = function () { return false; }
	current_magnet.style.position = "absolute";     
	current_magnet.style.zIndex = 100;       
	current_magnet.setAttribute("class","magnet magnet_up");
	return false; 
	
}   

function place_magnet(e)
{                                              
	
	  current_magnet.setAttribute('class',"magnet"); 
	  current_magnet.style.zIndex = 0;
	  current_magnet = ""; 
	 return false;                     
}

//we can generate magntes by class, we will need the prototype library for the $$()
function generate_magnets_by_class(klass_name,fridge)
{                   
  var magnets = get_spans_by_class(klass_name,fridge);
  
   //initialize the magnet container
   container = document.getElementById(fridge);
   container.setAttribute('onmouseup',"place_magnet(event); event.cancelBubble = true;");
   container.setAttribute('onmousemove',"move_magnet(event); event.cancelBubble = true;");   
   container.setAttribute('onblur',"place_magnet(event); event.cancelBubble = true;"); 

   //get the boundaries of the container
   fridge_width = container.style.width; 
   fridge_height = container.style.height;  
   
   //get the position of the magnet container to set up absolute positioning of the elements
   boundary_x = container.style.top.split('p')[0] - 0;
   boundary_y = container.style.left.split('p')[0] - 0;
   
   //set the container as absolute position but right where it is allready
   container.style.position = "relative"; 


   for(var i=0; i < magnets.length; i++)
   {         
	  var new_element_id = "magnet_" + i;
      magnets[i].setAttribute('id',new_element_id); 
      magnets[i].setAttribute('onmousedown',"lift_magnet(\'"+new_element_id+"\',event);")
      
      //grab position before we change style to absolute
      top = (magnets[i].style.top.split('p')[0] - 0) - boundary_x;
      left = (magnets[i].style.left.split('p')[0] -0) - boundary_y;        
         
      //not using this yet
      magnet_array.push(new magnet(new_element_id));
       
     
   } 
}     

function get_spans_by_class(klass_name,container)
{ 
	
    var retVal = new Array();      
    var target_container = document.getElementById(container);
    var elements = target_container.getElementsByTagName('span');

    for(var i = 0;i < elements.length;i++)
    {  
  		if(elements[i].className.indexOf(" ") >= 0)
        {
            var classes = elements[i].className.split(" ");
            for(var j = 0;j < classes.length;j++)
            {
                if(classes[j] == klass_name)
                    retVal.push(elements[i]);
            }
        }
        else if(elements[i].className == klass_name) 
        {
            retVal.push(elements[i]); 
        }
    }
    return retVal;
}

