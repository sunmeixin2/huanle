function getByClass(oParent, sClassName)
{
    var aElm=oParent.getElementsByTagName('*');
    var aArr=[];
    for(var i=0; i<aElm.length; i++)
    {
        if(aElm[i].className==sClassName)
        {
            aArr.push(aElm[i]);
        }
    }
    return aArr;
};
function tab(){
    var orderContent=document.getElementById('orderContent')
	var oTab=document.getElementById('tab');
    var aLi=getByClass(oTab, 'nav')[0].getElementsByTagName('li');
    var aA=oTab.getElementsByTagName('ul')[0].getElementsByTagName('a');
    var aDiv=getByClass(oTab, 'box');

    aDiv[0].style.display='block';
    
    for(let i=0; i<aLi.length; i++)
    {
     
        aLi[i].onclick=function()
        {
            orderContent.style.display = 'none';
            for( let i=0; i<aLi.length; i++)
            {
                aLi[i].className='';
                aDiv[i].style.display='none';
            }
            this.className='active';
            aDiv[i].style.display='block';
        };
    }
}