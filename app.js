let express = require('express');
let app = express();
let fs = require('fs');
let path = require('path');
let bodyParser = require('body-parser');
let cal = require('./public/assets/cal');
let port = process.env.PORT || 8080;

let gradeNum = {
		"S" : 10,
		"A" : 9,
		"B" : 8,
		"C" : 7,
		"D" : 6,
		"E" : 5,
		"F" : 0,
		"P" : 0,
		"I" : 0,
		"MP": 0,
		"DT": 0,
		"PASS": 1,
		"FAIL": 0
	}

app.use(express.static(__dirname + '/public'));
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
	res.render('index.ejs');
});

app.post('/', (req, res) => {		
	let semester, resultObj, objResult, nameObj, objNames, regNum, result,name;
	semester = req.body.semester;
	resultObj = fs.readFileSync(semester+'.json');
	objResult = JSON.parse(resultObj);
	regNum = req.body.username;	
	result = objResult[regNum];		
	if(result){		
		nameObj = fs.readFileSync('Names.json');	
		objNames = JSON.parse(nameObj);	
		name = objNames[regNum];		
		let gpa = cal(gradeNum, result);
		if (gpa["3"] == "0")
			gpa = gpa.slice(0, 3);
		if (gpa == "10.")
			gpa = gpa.slice(0, 2);
		if (name) {
			let nameStr = '';
			let nameArr = name.split(' ');
			if (nameArr[1] == undefined) {
				nameStr = nameArr[0];
			} else {
				nameStr = nameArr[0] + " " + nameArr[1]
			}
			regNum = nameStr;

		} else {
			regNum = regNum;
		}				
		res.render('result_page.ejs', { gpa: gpa, name: regNum, sresult: JSON.stringify(result)});
	}
	else {		
		res.status(404).send();
	}
});

app.get('/dev', (req, res) => {
	res.render('developers.html');
});

app.listen(port, (req, res) => {
	console.log('Server running on port : ' + port);
});
