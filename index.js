var express = require('express');
var app = express();
app.use(express.json());
app.set('port', process.env.PORT || 3000);

var teams = [
    {
        "teamID": "01",
        "name": "Croazia",
        "is_still_in": true,
        "matches": [
            {
                "opponent": "Italy",
                "outcome": "D"
            }, {
                "opponent": "France",
                "outcome": "L"
            }, {
                "opponent": "England",
                "outcome": "L"
            }, {
                "opponent": "Belgium",
                "outcome": "W"
            }
        ]
    },
    {
        "teamID": "02",
        "name": "Brazil",
        "is_still_in": true,
        "matches": [
            {
                "opponent": "France",
                "outcome": "D"
            }, {
                "opponent": "Germany",
                "outcome": "L"
            }, {
                "opponent": "England",
                "outcome": "L"
            }, {
                "opponent": "Croazia",
                "outcome": "W"
            }
        ]
    },
    {
        "teamID": "03",
        "name": "Italy",
        "is_still_in": true,
        "matches": [
            {
                "opponent": "Germany",
                "outcome": "D"
            }, {
                "opponent": "Brazil",
                "outcome": "L"
            }, {
                "opponent": "Croazia",
                "outcome": "L"
            }, {
                "opponent": "Belgium",
                "outcome": "W"
            }
        ]
    }
];

function searchTeamsByID(tID)
{
    var tIDA = [];

    teams.find(function(a)
    {
        if(a.teamID == tID){
            tIDA.push(a);
        }       
    });
    return tIDA;
}

function searchTeamsByName(tName)
{
    var tIDA = [];
    teams.find(function(a)
    {
        if(a.name == tName){
            tIDA.push(a);
        }       
    });
    return tIDA;
}


app.get('/', function(req, res)
{
    res.send('hello');
});

app.get('/teams', function(req, res)
{
    res.send(teams);
});

app.get('/teams/:teamID', function(req, res)
{
    var tIDA = searchTeamsByID(req.params.teamID);
    if (!tIDA){
        res.send('Team not found');
    }else{
        res.send(tIDA);
    }
});

app.post('/teams', function(req,res)
{  
    var team = {
        teamID:req.body.teamID, 
        name:req.body.name,
        is_still_in:req.body.is_still_in,
        matches:req.body.matches
    };
    teams.push(team);
    res.send(team);

})

app.put('/teams/:teamID', function(req, res)
{
    var team = searchTeamsByID(req.params.teamID);
    if (team)
    {
        team.teamID=req.body.teamID;
        team.name=req.body.name;
        team.is_still_in=req.body.is_still_in;
        team.matches=req.body.matches;
        res.send(team);
    }else{
        res.send('Team not found');
    }
});

app.delete('/teams/:teamID', function(req, res)
{
    var tema = searchTeamsByID(req.params.teamID);
    if (tea){
        teams.pop(team);
    }else{
        res.send('Team not found');
    }
});

app.listen(app.get('port'),function()
{
    console.log("Listening on port " + app.get('port'));
});