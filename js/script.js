let data =[];
//inital text
$(".total").hide();
$(".userlist").html('<h3 id="initial-text">Add users to view here!!</h3>');
$("#add-user").on('click', generateNewUser);
//$("#double").on('click', doubleMoney);
$("#show-millionaires").on('click', showMillionaires);
$("#sort").on('click', sortUsers);
$("#calculate-total-wealth").on('click', function(){
    $(".total").show();
    calculateTotal();
});


function generateNewUser()
{
    $.ajax({
        url: 'https://randomuser.me/api/',
        dataType:'json',
        success(res){
            const user = res.results[0];
            const newUser = {
                name: `${user.name.first} ${user.name.last}`,
                image: `${user.picture.thumbnail}`,
                money: Math.floor(Math.random() * 1000000)
            }
            //console.log(newUser);
            addData(newUser);
        },
        error(){
            alert("failed to fetch users :|");
        }
    });
}
/*
//double user money
function doubleMoney(){
    data = data.map(user =>{
        return {...user, money: user.money * 2};//... is spread operator
    });
    moneyUpdate();
}

//update double money on the DOM
function moneyUpdate()
{
    console.log($(".user-wealth").text());
}
*/

//show only millionaires
function showMillionaires()
{
    data  = data.filter(item => item.money > 1000000);

    //emptying the current item list
    const container = document.querySelector('.userlist');
    removeAllChildNodes(container);
    data.forEach(updateDOM);
}

//sort users by richest
function sortUsers()
{
    data.sort((a,b) => a.money - b.money);
    //emptying the current item list
    const container = document.querySelector('.userlist');
    removeAllChildNodes(container);

    data.forEach(updateDOM);
}

//calculate total wealth
function calculateTotal()
{
    const total = data.reduce((acc, user) =>  (acc + user.money) , 0);
    $(".total").text("Total : $ " + formatMoney(total));
}

//remove all child nodes
function removeAllChildNodes(parent) 
{
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

//add data to data array
function addData(newUser)
{
    data.push(newUser);
    updateDOM(newUser);
}

//update users on the page
function updateDOM(user)
{
    var htmlString = "";
    htmlString += `
    <div class="users">
        <div class="user" id="user-img">
            <img class="user-img" src="${user.image}">
        </div>

        <div class="user">
            <h6 class="user-name">${user.name}</h6>
        </div>

        <div class="user">
            <p class="user-wealth">$${formatMoney(user.money)}</p>
        </div>
        </div>`;

    $("#initial-text").hide();
    $(".userlist").prepend(htmlString);
    
}

//format to money
function formatMoney(number)
{
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
} 


