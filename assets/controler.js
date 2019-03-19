let j=0;
let budgetControler=(()=>{
   
    let map=new Map();
    let t,desc,val;
    let Data={
        allitems:{

        }
    }
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget:0,
        
        percentage: -1
    };
       
    
    return{
      
        getFromUI:(id,obj)=>{
            console.log("This is from Budget Controler");
          /*  console.log(obj);
            console.log(obj.type);
            console.log(obj.description);
            console.log(obj.value);
          */
               let IncArray=[id,obj.type,obj.description,obj.value];
               data.allItems[obj.type].push(IncArray);
              
               Array.from(IncArray,HOL=>{
                console.log(` After Holder ${HOL}`);
               })
              console.log(data.allItems); 
             },
        getData:()=>{
            return data;
        }
    }
})();

let UIContorler=(function(){
    let Dom={
        input_type:'.type',
        input_desc:'.description',
        input_value:'.value',
        add_btn:'.add_btn',
        income_div:'.income_div',
        expenses_div:'.expenses_div',
        Income_label:'.budget__income--value',
        Expens_label:'.exp_label',
        avail_budget:'.avail_budget',
        fordate:'.forDate',
        exp_percent:'.exp_percent'
        
    };
    /*
    Number formating --------------
    let formatNumber=(num)=>{
        let int=num;
        if(int.length > 3){
            int=int.substr(0,int.length-3)+','+int.substr(int.length-3,3);
        }
        return int;
    }*/
return {
    getInput:()=>{
        return {
        type:document.querySelector(Dom.input_type).value,
        description:document.querySelector(Dom.input_desc).value,
        value:document.querySelector(Dom.input_value).value
        }
    },

    displayContent:(con)=>{
        let html, newhtml, element,incomeValue,budelement,
        expenseValue,forTotal,exp_add,inc_add,forBudget,percent, per;
/************ for avilable budget property*******************************************/
            forBudget=budgetControler.getData();
          
               budelement=document.querySelector(Dom.avail_budget);
               budelement.textContent=forBudget.budget+" birr";
               
//*****************Display the content lable on the ui screen********************* */
        forTotal=budgetControler.getData();
        if(con[0]=== 'inc'){
            element=Dom.income_div;
            html=`<div><table class="table table-striped table-hover"><tr class="for-inc"> <td>${con[1]}</td><td class="birr">${con[2]} Birr<button class="delete-inc">x</button></td></tr></table></div>`;
            
            // display the income on the income label given 
               incomeValue=document.querySelector(Dom.Income_label);
               console.log(incomeValue);
               let parsedinc=parseInt(con[2]);
               inc_add=forTotal.totals['inc']+parsedinc;
               forTotal.totals['inc']=inc_add;
               console.log(forTotal.totals['inc']);
               incomeValue.textContent= `+${forTotal.totals['inc']}  birr`;
               console.log('Income Retrivedd from Total budeget in totals'+inc_add);
        }else if(con[0] === 'exp'){
            element=Dom.expenses_div;
            if(!(forBudget.budget===0)){
                if(forTotal.totals['inc']===0){
                    per=-1;
                }else{
                   per=Math.round((con[2]/forTotal.totals['inc'])*100);
                //alert(per);
                }    
            }else{
                per=-1;
            }
            
            html=`<div><table class="table table-striped table-hover"><tr class="for-exp"> <td>${con[1]}</td><td class="birr">${con[2]} Birr<label class="btn-danger exp_percent_each">${per}%</label><button class="delete-inc">x</button></td></tr></table></div>`;
             // display the income on the income label given 
             expenseValue=document.querySelector(Dom.Expens_label);
             console.log(expenseValue);
             let parsedexp=parseInt(con[2]);
             exp_add=forTotal.totals['exp']+parsedexp;
             forTotal.totals['exp']=exp_add;
             console.log(forTotal.totals['exp']);
             expenseValue.textContent= `-${forTotal.totals['exp']} birr`;
             console.log('Ecpense retrived from Total storage'+exp_add);
            
             
        }
    //! 1.Display the precentage of the overall Expnese relative to its total income//
        if(forTotal.totals['inc']===0){
            percent=-1;
        }else{
           percent=Math.round((forTotal.totals['exp']/forTotal.totals['inc'])*100);
        }
        document.querySelector(Dom.exp_percent).textContent=percent+'%';

        newhtml=html.replace('%description%',con[1]);
        newhtml=newhtml.replace('%value%',con[2]);
        document.querySelector(element).insertAdjacentHTML('beforeend',newhtml);
        UIContorler.init();
    },
    init:()=>{
        let makeItNull,desc,val;
        makeItNull=UIContorler.getDomStrings();
        desc=document.querySelector(makeItNull.input_desc);
        desc.value="";
        val=document.querySelector(makeItNull.input_value);
        val.value="";

    },
    initializ:()=>{
        let makeAllZero=0.0;
        document.querySelector(Dom.avail_budget).textContent=makeAllZero+ ' birr';
        document.querySelector(Dom.Expens_label).textContent=makeAllZero+ ' birr ';
        document.querySelector(Dom.Income_label).textContent=makeAllZero+ ' birr'
        
    },
    getDomStrings:()=>{
        return Dom;
    }
}

    
    
})();

/*********************Controler function***************************************** */

let Controler=((budgetCntl,uiCntl)=>{
    //1 connect with UI controler
    let inc,exp,element,input,date,monthes,dispMonth;
/********************Make all going to initialize zero at the beginning***********/
uiCntl.initializ();
/********************Displays the Current Month on the avilable budget************/
    date=new Date();
    monthes=['January','February','March'
             ,'April','May','June','July',
             'August' ,'September','October',
             'November','December'];
    dispMonth=document.querySelector(uiCntl.getDomStrings().fordate);
    dispMonth.textContent=`Available Budget in ${monthes[date.getMonth()]}  ${date.getFullYear()}`;
/****************Event Listener Function part*************************************/
    let UIEvent=()=>{
       input= uiCntl.getInput();
        // transfer input from ui to the budget controler
            budgetCntl.getFromUI(j,input);
            j++;
            let Hold_desc_value,calltotals,exp_add,inc_add,inc_budget;
                        
                    Hold_desc_value=[input.type,input.description,input.value];
                    calltotals=budgetCntl.getData();
          if(!(input.description==='' || input.value==='')){
           if(input.type === 'inc'){
                inc_add=calltotals.totals['inc']+parseInt(input.value);
                calltotals.budget+=parseInt(input.value);
               // inc_budget=calltotals.budget['budg']+parseInt(input.value);
                uiCntl.displayContent(Hold_desc_value);
           
            }else if(input.type === 'exp'){
                exp_add=calltotals.totals['exp']+parseInt(input.value);
                calltotals.budget-=parseInt(input.value);
                uiCntl.displayContent(Hold_desc_value);
            }
        }else{
            alert(' Insert Something please?')
           // document.querySelector(uiCntl.getDomStrings().input_desc).addEventListener('onfocus',this)
        }
            
            console.log("Avilable budget :")
            console.log(calltotals.budget);
            
                 
        
    }
    //Event Listener for input button
    let domObjec=uiCntl.getDomStrings();
    document.querySelector(domObjec.add_btn).addEventListener('click',UIEvent);
    document.addEventListener('keypress', function(event) {
        if (event.keyCode === 13 || event.which === 13) {
            UIEvent();
        }
    });
    
        let fields=document.querySelectorAll(domObjec.input_type+','+
                                             domObjec.input_desc+','+
                                             domObjec.input_value);
        
        if(uiCntl.getInput().type==='exp'){
            fields.classList.toggle('red');
        }
    /// create dom object to access from ui

})(budgetControler,UIContorler);
/*
var deleteItem= (function() {
    var ids, index;
    
     id = 6
    data.allItems[type][id];
     ids = [1,2,4,  8];
    index = 3
    
    ids = data.allItems[type].map(function(current) {
        return current.id;
    });

    index = ids.indexOf(id);

    if (index !== -1) {
        data.allItems[type].splice(index, 1);
    }
    
})(5,8);*/