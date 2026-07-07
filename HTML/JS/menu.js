// ==========================
// MENU DATA
// ==========================

const menuData = {

coffee: [],

tea: [],

signature: [],

breakfast: [],

mains: [],

desserts: [],

beverages: []

};

// ==========================
// AUTO CREATE 14 ITEMS
// ==========================

const menuItems = {

coffee: [
{name:"Espresso",image:"../Images/coffee1.png",description:"Rich espresso shot with a bold aroma.",price:"₹199"},
{name:"Americano",image:"../Images/coffee2.png",description:"Smooth espresso blended with hot water.",price:"₹219"},
{name:"Cappuccino",image:"../Images/coffee3.png",description:"Creamy steamed milk topped with foam.",price:"₹249"},
{name:"Latte",image:"../Images/coffee4.png",description:"Silky milk and espresso in perfect harmony.",price:"₹259"},
{name:"Mocha",image:"../Images/coffee5.png",description:"Espresso infused with premium chocolate.",price:"₹279"},
{name:"Flat White",image:"../Images/coffee6.png",description:"Velvety microfoam with double espresso.",price:"₹269"},
{name:"Macchiato",image:"../Images/coffee7.png",description:"Espresso finished with a touch of milk.",price:"₹239"},
{name:"Caramel Macchiato",image:"../Images/coffee8.png",description:"Sweet caramel layered over rich espresso.",price:"₹299"},
{name:"Hazelnut Latte",image:"../Images/coffee9.png",description:"Creamy latte with roasted hazelnut flavour.",price:"₹289"},
{name:"Vanilla Latte",image:"../Images/coffee10.png",description:"Classic latte with smooth vanilla notes.",price:"₹279"},
{name:"Cold Brew",image:"../Images/coffee11.png",description:"Slow brewed for an incredibly smooth taste.",price:"₹249"},
{name:"Affogato",image:"../Images/coffee12.png",description:"Espresso poured over vanilla ice cream.",price:"₹319"},
{name:"Irish Coffee",image:"../Images/coffee13.png",description:"Warm coffee with a creamy luxurious finish.",price:"₹339"},
{name:"Iced Coffee",image:"../Images/coffee14.png",description:"Refreshing chilled coffee served over ice.",price:"₹229"}
],

tea: [

{name:"Masala Chai",image:"../Images/Tea1.png",description:"A traditional Indian tea brewed with aromatic spices and fresh milk.",price:"₹149"},
{name:"Classic English Breakfast",image:"../Images/Tea2.png",description:"A full-bodied black tea with a rich and refreshing flavour.",price:"₹169"},
{name:"Earl Grey",image:"../Images/Tea3.png",description:"Premium black tea infused with fragrant bergamot citrus.",price:"₹189"},
{name:"Green Tea",image:"../Images/Tea4.png",description:"A light and refreshing tea packed with natural antioxidants.",price:"₹179"},
{name:"Chamomile Tea",image:"../Images/Tea5.png",description:"A soothing herbal infusion with delicate floral notes.",price:"₹199"},
{name:"Peppermint Tea",image:"../Images/Tea6.png",description:"Cool and refreshing mint leaves brewed to perfection.",price:"₹189"},
{name:"Jasmine Tea",image:"../Images/Tea7.png",description:"Delicate green tea blended with fragrant jasmine blossoms.",price:"₹209"},
{name:"Hibiscus Tea",image:"../Images/Tea8.png",description:"A vibrant floral tea with a naturally tangy finish.",price:"₹199"},
{name:"Lemon Ginger Tea",image:"../Images/Tea9.png",description:"Refreshing lemon balanced with the warmth of fresh ginger.",price:"₹189"},
{name:"Kashmiri Kahwa",image:"../Images/Tea10.png",description:"Traditional Kashmiri green tea with saffron, almonds and spices.",price:"₹249"},
{name:"Matcha Latte",image:"../Images/Tea11.png",description:"Premium Japanese matcha blended with creamy steamed milk.",price:"₹289"},
{name:"Oolong Tea",image:"../Images/Tea12.png",description:"Smooth semi-oxidized tea with a naturally sweet finish.",price:"₹229"},
{name:"Rose Milk Tea",image:"../Images/Tea13.png",description:"Creamy tea infused with delicate rose essence.",price:"₹239"},
{name:"Iced Peach Tea",image:"../Images/Tea14.png",description:"Refreshing chilled tea infused with juicy peach flavour.",price:"₹219"}

],


signature:[

{
name:"Truffle Mushroom Risotto",
image:"../Images/sign1.png",
description:"Creamy Arborio rice cooked with wild mushrooms and aromatic truffle oil.",
price:"₹399"
},

{
name:"Peri Peri Paneer Steak",
image:"../Images/sign2.png",
description:"Grilled paneer steak marinated in peri peri spices, served with sautéed vegetables.",
price:"₹349"
},

{
name:"Lotus Biscoff Cheesecake",
image:"../Images/sign3.png",
description:"Creamy cheesecake layered with Lotus Biscoff spread on a crunchy biscuit base.",
price:"₹299"
},

{
name:"Burrata Pesto Bruschetta",
image:"../Images/sign4.png",
description:"Toasted sourdough topped with burrata, basil pesto and cherry tomatoes.",
price:"₹349"
},

{
name:"Spicy Korean BBQ Wings",
image:"../Images/sign5.png",
description:"Crispy chicken wings coated in sweet and spicy Korean BBQ glaze.",
price:"₹329"
},

{
name:"Creamy Alfredo Pasta",
image:"../Images/sign6.png",
description:"Classic fettuccine tossed in rich Alfredo sauce with parmesan cheese.",
price:"₹349"
},

{
name:"Grilled Herb Chicken",
image:"../Images/sign7.png",
description:"Juicy grilled chicken breast served with mashed potatoes and seasonal vegetables.",
price:"₹379"
},

{
name:"Pesto Genovese Pasta",
image:"../Images/sign8.png",
description:"Fresh basil pesto pasta topped with parmesan and roasted cherry tomatoes.",
price:"₹349"
},

{
name:"Chocolate Lava Cake",
image:"../Images/sign9.png",
description:"Warm molten chocolate cake served with creamy vanilla ice cream.",
price:"₹299"
},

{
name:"Thai Red Curry & Jasmine Rice",
image:"../Images/sign10.png",
description:"Authentic Thai red curry simmered in coconut milk with fragrant jasmine rice.",
price:"₹349"
}


],

breakfast: [],

mains: [],

desserts: [],

beverages: []

};

Object.keys(menuItems).forEach(category=>{
    menuData[category]=menuItems[category];
});

// ==========================
// ELEMENTS
// ==========================

const menuContainer = document.getElementById("menu-container");

const buttons = document.querySelectorAll(".category");

// ==========================
// LOAD CATEGORY
// ==========================

function loadCategory(category){

    menuContainer.style.opacity="0";

    setTimeout(()=>{

        menuContainer.innerHTML="";

        menuData[category].forEach(item=>{

            menuContainer.innerHTML+=`

            <div class="menu-card">

                <img src="${item.image}" alt="${item.name}">

                <div class="card-content">

                    <h2>${item.name}</h2>

                    <p>${item.description}</p>

                    <div class="price">

                        ${item.price}

                    </div>

                </div>

            </div>

            `;

        });

        menuContainer.style.opacity="1";

    },250);

}

// ==========================
// CATEGORY BUTTONS
// ==========================

buttons.forEach(button=>{

    button.addEventListener("click",()=>{

        buttons.forEach(btn=>btn.classList.remove("active"));

        button.classList.add("active");

        loadCategory(button.dataset.category);

    });

});

// ==========================
// INITIAL LOAD
// ==========================

loadCategory("coffee");

// ==========================
// SCROLL BUTTONS
// ==========================

const left=document.querySelector(".left");

const right=document.querySelector(".right");

left.onclick=()=>{

    menuContainer.scrollBy({

        left:-400,

        behavior:"smooth"

    });

}

right.onclick=()=>{

    menuContainer.scrollBy({

        left:400,

        behavior:"smooth"

    });

}