class ini {
    constructor(nm,pr,sp,hs,turns,require,tp) 
    {
        this.name = nm;
        this.price = pr;
        this.support = sp;
        this.hostile = hs;
        this.costtobuild = turns;
        this.requirementInitiative = require;
        this.type = tp;
    }
}
function supportOverTime(init)
{
    return ((deadline-(init.costtobuild / (1+accessibility)))*support(init))
}
function requirementMet(init)
{
    if(init.requirementInitiative === "")
    {
        return true;
    }
    for(i=0;i<bought_inis.length;i++)
    {
        if(init.requirementInitiative === bought_inis[i].name)
        {
            return true;
        }
    }
    return false;
}
function banCheck(init)
{
    for(checkBan=0;checkBan<banned.length;checkBan+=1)
    {
        if(init.type === banned[checkBan])
        {
            return true;
        }
    }
    return false;
}
function notBoughtAlready(init)
{
    for(i=0;i<bought_inis.length;i++)
    {
        if(init.name === bought_inis[i].name)
        {
            return false;
        }
    }
    return true;
}
function support(init)
{
    return ((init.support*0.4*pr_mod)+(init.hostile*0.4*pr_mod));
}
function supportEachIni(arr)
{
    var total = 0
    for(i=0;i<arr.length;i+=1)
    {
        total += support(arr[i])
    }
    return Math.floor(total*100)/100;
}
function efficiency(arr)
{
    let eff = 0;
    for(i=0;i<arr.length;i++)
    {

        eff += supportOverTime(arr[i]);
    }
    return Math.floor(eff*100)/100;
}
function buyIni(init)
{
    bought_inis.push(init);
    budget -= init.price;
}
function listInis(arr)
{
    var stringer = "";
    for(i=0;i<arr.length;i+=1)
    {
        stringer += arr[i].name + "<br>";
    }
    return stringer;
}
function findCheapestIni(arr)
{
    let cheapest = 999;
    for(i=1;i<arr.length;i+=1)
    {
        if(arr[i].price < cheapest && !banCheck(arr[i].type))
        {
            cheapest = arr[i].price;
        }
    }
    return cheapest;
}
function findRoad(arr)
{
    let roads = 0
    for(i=1;i<arr.length;i+=1)
    {
        if(arr[i].name === "Road Building 1" || arr[i].name === "Road Building 2")
        {
            roads += 1;
        }
    }
    return roads;
}
function canBuy(arr,money)
{
    let newArr = []
    for (i=0;i<arr.length;i+=1)
    {
        if(money >= arr[i].price)
        {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}
function findInInis(nam,arr)
{
    for (i=0;i<arr.length;i+=1)
    {
        if(nam === arr[i].name)
        {
            return i;
        }
    }
    return false;
}
function reset()
{
    document.getElementById('best_generation').innerHTML = "None yet;";
    best_gen_info = [...gen_info];
}
function resetAll()
{
    document.getElementById('most_cost_efficient').innerHTML = "No generations yet";
    gen_info = [];
    gen = 1;
    reset();
}
const initiatives = 
[
    new ini("Services Discussions",3,0,0,0,"",'services'),
    new ini("Medical Supplies",2,0.56,2.24,16.21,"Services Discussions",'meds'),
    new ini("Water Supplies",2,0.63,2.52,20.84,"Services Discussions",'water'),
    new ini("Water Expansion",2,0.56,2.24,23.15,"Water Supplies",'water'),
    new ini("Basic Sanitation",2,0.56,2.24,20.84,"Water Supplies",'water'),
    new ini("Expanded Sanitation",2,0.56,2.24,23.15,"Basic Sanitation",'water'),
    new ini("Core Health Care",3,0.7,2.8,16.21,"Medical Supplies",'meds'),
    new ini("Expanded Health Care",2,0.56,2.24,18.52,"Core Health Care",'meds'),
    new ini("Personal Health Program",2,0.56,2.24,18.52,"Core Health Care",'meds'),
    new ini("Vaccine 1",3,0.6,2.4,11.57,"Core Health Care",'meds'),
    new ini("Vaccine 2",3,0.6,2.4,11.57,"Vaccine 1",'meds'),
    new ini("School Regeneration",2,0.49,1.47,13.89,"Services Discussions",'schools'),
    new ini("School Supplies",3,0.7,2.1,9.26,"School Regeneration",'schools'),
    new ini("School Expansion",3,0.49,1.47,11.57,"School Supplies",'schools'),
    new ini("Literacy Drive",3,0.49,1.47,9,26,"School Regeneration",'schools'),

    new ini("Jobs Discussions",3,0,0,0,"",'jobs'),
    new ini("Vocational Training",6,2.4,0.24,60.21,"Jobs Discussions",'genericjob'),
    new ini("Land Rights",5,2,0.2,60.21,"Jobs Discussions",'genericjob'),
    new ini("Development Bank",5,2,0.2,60.21,"Jobs Discussions",'city'),
    new ini("Agricultural Logistics",7,2.4,0.24,60.21,"Livestock Development",'agricultural'),
    new ini("Industrial Support",7,2.4,0.24,60.21,"Development Bank",'city'),
    new ini("Crop Development",6,2,0.2,60.21,"Livestock Development",'agricultural'),
    new ini("Export Agencies",5,1.6,0.16,60.21,"Land Rights",'genericjob'),
    new ini("Livestock Development",5,1.6,0.16,60.21,"Jobs Discussions",'agricultural'),
    new ini("Commercial Support",5,1.6,0.16,60.21,"Development Bank",'city'),
    new ini("Remote Subsidies",6,0.8,0.8,60.21,"Development Bank",'remote'),

    new ini("Infra Discussions",3,0,0,0,"",'infra'),
    new ini("Electricity 1",8,1,1,34.73,"Infra Discussions",'electricity'),
    new ini("Electricity 2",12,1,1,30.10,"Electricity 1",'electricity'),
    new ini("Road Building 1",8,0.3,0.3,38,"Infra Discussions",'roads'),
    new ini("Road Building 2",8,0.3,0.3,38,"Road Building 1",'roads'),
];
var bought_inis = [];
var combinations = []
var deadline = (54+72+72+72); //january 2006
const starting_budget = 24;
const pr_mod = 0.45;
var accessibility = 0.3;
var budget = starting_budget;
let mostEff = -1;
let numOfEff = 0;
let totSuppLvL = 0;
let gen = 1;
let best_gen_info = [];
let banned = [];
let gen_info =[];
function run(num)
{
    deadline = document.getElementById('deadline').value*1;
    banned = [];
    var classes = document.getElementsByClassName('disable');
    for(bans=0;bans<classes.length;bans+=1)
    {
        if(classes[bans].checked)
        {
            banned.push(classes[bans].id);
        }
    }
    console.log(banned);
    for(runner=0;runner<num;runner+=1)
    {
        start();
    }
}
function start()
{
    for(z=0;z<initiatives.length;z+=1)
    {
        console.log('new combo');
        let available = [...initiatives];;
        console.log(available);
        bought_inis = [];
        budget = document.getElementById('funders').value*1;
        if(requirementMet(available[z]) && notBoughtAlready(available[z]) && available[z].price <= budget && !banCheck(available[z]))
        {
            buyIni(available[z]);
            available.splice(z, 1);
            console.log("bought " + available[z].name)
        }
        while (budget>0 && budget>findCheapestIni(available))
        {
            let purchasable = canBuy(available,budget);
            let ableness = [];
            for (sam=0;sam<purchasable.length;sam+=1)
            {
                if(requirementMet(purchasable[sam]) && notBoughtAlready(purchasable[sam]) && !banCheck(purchasable[sam]))
                {
                    ableness.push(purchasable[sam]);
                }
            }
            let j = Math.floor(Math.random()*(ableness.length))
            if(ableness.length != 0)
            {
                j = findInInis(ableness[j].name,available);
                buyIni(available[j]);
                console.log("bought " + available[j].name)
                available.splice(j, 1);
            }
            else
            {
                budget = 0;
            }

        }
        
        combinations[z] = bought_inis;
    }
    for(h=0;h<combinations.length;h+=1)
    {
        accessibility =  document.getElementById('access').value*1 + (findRoad(combinations[h]*0.3));
        let eff = efficiency(combinations[h])
        if(mostEff < eff)
        {
            numOfEff = eff;
            mostEff = h;
        }
    }
    gen_info = [gen,numOfEff,supportEachIni(combinations[mostEff]),listInis(combinations[mostEff])]
    if(gen === 1)
    {
        best_gen_info = [...gen_info];
    }
    document.getElementById('most_cost_efficient').innerHTML = '<br>Generation: ' +gen_info[0]+ '<br>Efficiency: ' + gen_info[1] + '<br>Support: '+gen_info[2]+'<br>using:<br><br>' + gen_info[3];
    if(gen_info[1]> best_gen_info[1] || gen === 1)
    {
        best_gen_info = gen_info;
        document.getElementById('best_generation').innerHTML = '<br>Best Generation: ' +best_gen_info[0]+ '<br>Efficiency: ' + best_gen_info[1] + '<br>Support: '+best_gen_info[2]+'<br>using:<br><br>' + best_gen_info[3];
    }
    gen+=1;
}