Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

var Game = (function (game) {
	
	var resourceType = function (name, description) {
		return {
			name: name,
			description: description
		};
	};
	
	var eraType = function (name, description, requirements) {
		return {
			name: name,
			description: description,
			requirements: requirements
		};
	};

	var changeType = function (description, cost, change, research) {
		return {
			description: description,
			cost: cost,
			change: change,
			research: research || []
		};
	};

	var researchType = function (description, unlockedIn, requires, time) {
		return {
			description: description,
			unlockedIn: unlockedIn,
			requires: requires,
			time: time
		};
	};
	
	var naturalEventType = function (name, description, era, probability, requirement, event) {
		return {
			name: name,
			description: description,
			era: era,
			probability: probability,
			requirement: requirement,
			event: event
		};
	};
	
	var arrayToTable = function (tableID, header, array) {
		var table = document.getElementById(tableID);
		while (table.firstChild) table.removeChild(table.firstChild);
		
		var tableHeader = document.createElement("th");
		tableHeader.innerHTML = header;
		tableHeader.setAttribute("colspan", 100);
		table.appendChild(tableHeader);
		
		array.forEach(function (rowData) {
			var row = document.createElement("tr");
			rowData.forEach(function (cellData) {
				var cell = document.createElement("td");
				cell.appendChild(document.createTextNode(cellData));
				row.appendChild(cell);
			});
			table.appendChild(row);
		});
	};
	
	
	
	game.eras = [
		eraType("Paleolithic Era", "your civilization has begun to manufacture tools to aid in its development.", function () {return true;}),
		eraType("Early Stone Age", "your civilization has discovered how to produce stone tools and has mastered the control of fire.", function () {return game.resources.stone > 0;})
	];
	
	game.resourceTypes = [
		resourceType("log", "a bit of a tree"),
		resourceType("wood", "refined log"),
		resourceType("charcoal", "burnt logs"),
	];

	game.conversionTypes = {
		"hunter": changeType("hunts for food", {'food': 30}, {'food': 1}, ["hunting"]),
		"lumberjack": changeType("cuts logs", {'food': 20}, {'food': -4, 'log': 1}, ["wood gathering"]),
		"woodworker": changeType("crafts logs into wood", {'food': 100, 'log': 200}, {'food': -2, 'log': -2, 'wood': 3}, ["craftsmanship"]),
		"stone miner": changeType("mines stone", {'food': 150, 'log': 50, 'wood': 300}, {'food': -2, 'log': -2, 'wood': -2, 'stone': 1}, ["masonry"]),
	};
	
	game.researchTypes = {
		"hunting": researchType("collect food", 0, [], 10),
		"wood gathering": researchType("gather logs", 0, [], 30),
		"craftsmanship": researchType("turn logs into wood", 0, ["wood gathering"], 50),
		"masonry": researchType("work with stone", 0, ["craftsmanship"], 80),
		"domestication": researchType("domesticate animals", 0, ["hunting", "wood gathering"], 100)
	};
						
	game.resources = {
		'food': 40
	};
						
	game.researchedConversions = [];
	game.renderedConversions = [];
	game.currentlyResearching = [];
	game.researchProgress = {};
	
	game.naturalEvents = [
		naturalEventType("Termite Infestation", "A swarm of termites have destroyed your wood!", 0, 0.01, function () {return game.resources.log > 0 || game.resources.wood > 0;}, function () {if (game.resources.log > 0) game.resources.log = Math.floor(game.resources.log * Math.random()); if (game.resources.wood > 0) game.resources.wood = Math.floor(game.resources.wood * Math.random())})
	];

	//[total number, number activated]
	game.conversions = {
	};

	game.era = 0;

	game.speed = 1000;
	game.researchMultiplier = 1.0;

	//game.unlockResearch = function (
	
	game.researching = function (obj, researchType, progress) {
		obj.find(".percentunlocked").text("" + Math.floor(progress * 100) + "%");
		if (progress < 1)
			setTimeout(function () {game.researching(obj, researchType, progress + 0.01)}, game.researchTypes[researchType].time * 10 * game.researchMultiplier * game.currentlyResearching.length);
		else {
			game.researchProgress[researchType] = 1;
			game.currentlyResearching.remove(game.currentlyResearching.indexOf(researchType));
		}
	};					
	
	
						
	var renderResearches = function () {
		var researchDiv = $("#researches");
		for (var researchType in game.researchTypes) {
			var curResearchType = game.researchTypes[researchType];
			if (curResearchType.unlockedIn == game.era) {
				var curDiv = $("<div/>");
				curDiv.addClass("research");
				curDiv.data("researchType", researchType);
				curDiv.append($("<div class='researchname'>"+researchType+"</div>"));
				curDiv.append($("<div class='researchdescription'>"+curResearchType.description+"</div>"));
				if (curResearchType.requires.length > 0)
					curDiv.append($("<div class='researchrequirements'>requires "+curResearchType.requires.join(", ")+"</div>"));
				curDiv.append($("<div class='percentunlocked'>0%</div>"));
				researchDiv.append(curDiv);
				curDiv.click(function () {
					var type = $(this).data("researchType");
					console.log(type + " clicked");
					if (!game.researchProgress.hasOwnProperty(type)) {
						for (var i = 0; i < game.researchTypes[type].requires.length; i++) {
							if (game.researchProgress[game.researchTypes[type].requires[i]] != 1) return;
						}
						game.researchProgress[type] = 0;
						game.currentlyResearching.push(type);
						game.researching($(this), type, 0);
					}
				});
				
			}
		}
	};
						
	game.init = function () {
		renderResearches();
	
		$(".research").click(function () {
			
		});
	}
	
	game.renderLoop = function () {
		$("#era").text(game.eras[game.era].name);
		$("#eradescription").text(game.eras[game.era].description);
		document.title = game.eras[game.era].name;
		var resourcesArr = [];
		for (var resource in game.resources) {
			resourcesArr.push([resource, game.resources[resource]]);
		}
		arrayToTable("resources", "resources", resourcesArr);
		
		for (var conversion in game.conversionTypes) {
			var curConversionType = game.conversionTypes[conversion];
			if (game.researchedConversions.indexOf(conversion) == -1) {
				var researched = true;
				for (var i = 0; i < curConversionType.research.length; i++) {
					if (!game.researchProgress.hasOwnProperty(curConversionType.research[i]) || game.researchProgress[curConversionType.research[i]] != 1) researched = false;
				}	
				if (researched) game.researchedConversions.push(conversion);
			}
		}
		
		var productionsDiv = $("#productiontypes")
		for (var conversion in game.conversionTypes) {
			var curConversionType = game.conversionTypes[conversion];
			if (game.researchedConversions.indexOf(conversion) != -1 && game.renderedConversions.indexOf(conversion) == -1) {
				game.renderedConversions.push(conversion);
				var productionDiv = $("<div/>");
				productionDiv.addClass("production");
				productionDiv.append($("<div/>").addClass("productionname").text(conversion));
				//productionDiv.append($("<div/>").addClass("productiondescription").text(curConversionType.description));
				var costs = [];
				for (var resource in curConversionType.cost) {
					costs.push("" + curConversionType.cost[resource] + " " + resource);
				}
				productionDiv.append($("<div/>").addClass("productioncost").text("costs " + costs.join(", ")));
				var effects = [];
				for (var resource in curConversionType.change) {
					effects.push((curConversionType.change[resource] > 0 ? "+" : "") + curConversionType.change[resource] + " " + resource);
				}
				
				productionDiv.append($("<div/>").addClass("productioneffect").text(effects.join(", ")));
				var addProductionDiv = $("<div/>").text("+").addClass("addproduction").data("production", conversion);
				productionDiv.append(addProductionDiv);
				var reduceProductionDiv = $("<div/>").text("-").addClass("reduceproduction").data("production", conversion);
				productionDiv.append(reduceProductionDiv);
				productionDiv.append($("<div/>").addClass("productionnumber").text("0"));
				productionsDiv.append(productionDiv);
				addProductionDiv.click(function () {
					var conversionType = $(this).data("production");
					if (!game.conversions.hasOwnProperty(conversionType)) {
						game.conversions[conversionType] = 0;
					}
					var cost = game.conversionTypes[conversionType].cost;
					for (var resource in cost) {
						if (!game.resources.hasOwnProperty(resource) || game.resources[resource] < cost[resource]) {
							return;
						}
					}
					for (var resource in cost) {
						game.resources[resource] -= cost[resource];
					}
					game.conversions[conversionType]++;
					$(this).parent().find(".productionnumber").text(game.conversions[conversionType]);
				});
				reduceProductionDiv.click(function () {
					var conversionType = $(this).data("production");
					if (!game.conversions.hasOwnProperty(conversionType)) {
						game.conversions[conversionType] = 0;
					}
					if (game.conversions[conversionType] > 0) game.conversions[conversionType]--;
					$(this).parent().find(".productionnumber").text(game.conversions[conversionType]);
				});
			}
		}
		
		setTimeout(function () { game.renderLoop(); }, 100);
		
	}
		
	game.loop = function () {
		
		//Change Era
		if (game.era < game.eras.length - 1) {
			if (game.eras[game.era + 1].requirements()) {
				game.era++;
				renderResearches();
			}
		}	

		//Consume Resources
		for (var conversion in game.conversions) {
			var curConversionType = game.conversionTypes[conversion];
			var maxConversion = game.conversions[conversion];
			for (var resource in curConversionType.change) {
				if (!game.resources.hasOwnProperty(resource)) {
					game.resources[resource] = 0;
				}
				if (curConversionType.change[resource] < 0) {
					maxConversion = Math.min(maxConversion, Math.floor(game.resources[resource]/-curConversionType.change[resource]));
				}
			}

			for (var resource in curConversionType.change) {
				game.resources[resource] += curConversionType.change[resource] * maxConversion;
			}
			
		}
		setTimeout(function () {game.loop()}, game.speed);
	}
	return game;
} (Game || {}));

window.onload = function () {
	Game.init();
	Game.renderLoop();
	Game.loop();
}