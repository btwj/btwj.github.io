const GAME_ROUNDS = [undefined, undefined, undefined, undefined, undefined,
	{sizes: [2, 3, 2, 3, 3], to_fail: [1, 1, 1, 1, 1], spies: 2},
	{sizes: [2, 3, 4, 3, 4], to_fail: [1, 1, 1, 1, 1], spies: 2},
	{sizes: [2, 3, 3, 4, 4], to_fail: [1, 1, 1, 2, 1], spies: 3},
	{sizes: [3, 4, 4, 5, 5], to_fail: [1, 1, 1, 2, 1], spies: 3},
	{sizes: [3, 4, 4, 5, 5], to_fail: [1, 1, 1, 2, 1], spies: 3},
	{sizes: [3, 4, 4, 5, 5], to_fail: [1, 1, 1, 2, 1], spies: 4},
]

class Player {
	constructor(name) {
		this.name = name;
		this.id = -1;
		this.role = undefined;
		this.selected = false;
		this.successSelected = false;
	}
}

class Mission {
	constructor(players, id) {
		this.size = 0;
		this.to_fail = 0;
		this.members = [];
		this.completed = false;
		this.sabotaged = false;
	}

	init(players, id) {
		this.size = GAME_ROUNDS[players].sizes[id];
		this.to_fail = GAME_ROUNDS[players].to_fail[id];
	}
}

var app = new Vue({
	el: "#app",
	data: {
		screenActive: "name-select",
		passActive: false,
		passId: 0,
		players: [],
		newPlayer: '',
		activeId: 0,
		btnClicked: false,
		missions: [new Mission(), new Mission(), new Mission(), new Mission(), new Mission()],
		missionId: 0,
		missionLeaderId: 0,
		voteBtnSelected: false,
		passSelected: false,
		selectId: 0,
		actionSelected: false,
		successSelected: false,
		missionRevealShown: false
	},
	created: function () {
	},
	methods: {
		addPlayer: function () {
			var names = this.players.map((player) => {
				return player.name;
			});

			if (names.indexOf(this.newPlayer) === -1 && this.newPlayer !== "") {
				this.players.unshift(new Player(this.newPlayer));
				this.newPlayer = "";
			}
		},
		nameSelectDone: function () {
			var size = this.players.length;
			if (size >= 5 && size <= 10) {
				this.activeId = 0;
				this.assignRoles();
				this.initMissions();
				this.expandBtn("#name-select-done-btn", function () {
					this.screenActive = "role-reveal";
					this.showPassScreen(0);
				});
			}
		},
		initMissions: function () {
			for (var i = 0; i < 5; i++) {
				this.missions[i].init(this.players.length, i);
			}
		},
		assignRoles: function () {
			var roles = [];
			var size = this.players.length;
			for (var i = 0; i < size; i++) {
				if (i < GAME_ROUNDS[size].spies) roles.push("spy");
				else roles.push("resistance");
			}
			roles = _.shuffle(roles);
			for (var i = 0; i < size; i++) {
				this.players[i].id = i;
				this.players[i].role = roles[i];
			}
			console.log(this.players);
		},
		showPassScreen: function (id) {
			this.passActive = true;
			this.passId = id;
			anime({targets: "#pass-main", opacity: [0, 1], translateY: ["10%", "50%"], easing: "easeInOutBack"});
			anime({targets: "#pass-done", translateY: ["0rem", "-4rem"], opacity: [0, 1], easing: "easeInOutBack"});
		},
		hidePassScreen: function (callback) {
			var a = anime({targets: "#pass", opacity: 0, easing: "easeInOutQuad", duration: 300});
			var _this = this;
			a.complete = function () {
				callback();
				_this.passActive = false;
				u("#pass").attr("style", "");
			}
		},
		passDone: function () {
			this.hidePassScreen(this.screenEnter.bind(this));
		},
		expandBtn: function (target, callback, bgColor) {
			var bgColor = bgColor || '#388E3C';
			u(target).text("");
			var a = anime({targets: target, top: "0px", left: "0px", backgroundColor: bgColor, easing: "easeOutExpo"});
			var _this = this;
			a.complete = function () {
				callback.bind(_this)();
				u(target).addClass("invisible");
				u(target).attr("style", "");
				u(target).text("Go");
			}
		},
		resetBtn: function (el) {
			el.removeClass("invisible");
		},
		roleRevealDone: function () {
			if (this.btnClicked) return;
			else this.btnClicked = true;
			this.expandBtn("#role-reveal-done-btn", function () {
				this.activeId += 1;
				if (this.activeId === this.players.length) {
					this.activeId = 0;
					this.missionId = 0;
					this.showPassScreen(this.activeId);
					this.screenActive = "team-select";
				} else {
					this.showPassScreen(this.activeId);
				}
				this.btnClicked = false;
			});
		},
		screenEnter: function () {
			if (this.screenActive === "role-reveal") {
				this.resetBtn(u("#role-reveal-done-btn"));
				anime({targets: "#reveal-info", opacity: [0, 1], translateY: ["0px", "5rem"], easing: "easeInOutBack"});
				anime({targets: "#role-reveal-done-btn", opacity: [0, 1], translateY: ["5rem", "0"], easing: "easeInOutQuad"});
				anime({targets: "#role-reveal .bottom-bar", opacity: [0, 1], translateY: ["5rem", "0"], easing: "easeInOutQuad"});
			} else if (this.screenActive === "team-select") {
				this.resetBtn(u("#team-select-done-btn"));
				anime({targets: "#team-select .mission-list", opacity: [0, 1], translateY: ["-50px", 0], easing: "easeInOutQuad"});
				anime({targets: "#team-leader-info", opacity: [0, 1], translateY: ["-50px", 0], easing: "easeInOutQuad", delay: 250});
				anime({targets: "#team-div", opacity: [0, 1], translateY: ["50px", 0], easing: "easeInOutQuad", delay: 750});
				anime({targets: "#team-select-done-btn", opacity: [0, 1], translateY: ["5rem", "0"], easing: "easeInOutQuad"});
				anime({targets: "#team-select .bottom-bar", opacity: [0, 1], translateY: ["5rem", "0"], easing: "easeInOutQuad"});
			} else if (this.screenActive === "team-vote") {
				this.resetBtn(u("#vote-select-done-btn"));
				anime({targets: "#vote-leader-info", opacity: [0, 1], translateY: ["-50px", 0], easing: "easeInOutQuad"});
				anime({targets: "#team-vote .player-list", opacity: [0, 1], translateY: ["-50px", 0], easing: "easeInOutQuad", delay: 0});
				anime({targets: "#vote-instructions", opacity: [0, 1], translateY: ["50px", 0], easing: "easeInOutQuad", delay: 500});
				anime({targets: "#vote-btns", opacity: [0, 1], translateY: ["50px", 0], easing: "easeInOutQuad", delay: 2000});
				
				anime({targets: "#vote-select-done-btn", opacity: [0, 1], translateY: ["5rem", "0"], easing: "easeInOutQuad"});
				anime({targets: "#team-vote .bottom-bar", opacity: [0, 1], translateY: ["5rem", "0"], easing: "easeInOutQuad"});
			} else if (this.screenActive === "action-select") {
				this.resetBtn(u("#action-select-done-btn"));
				this.actionSelected = false;
				anime({targets: "#action-select h1", opacity: [0, 1], translateY: ["-50px", 0], easing: "easeInOutQuad", delay: 0});
				anime({targets: "#action-select .player-list", opacity: [0, 1], translateY: ["-50px", 0], easing: "easeInOutQuad", delay: 0});
				anime({targets: "#action-select #action-btns", opacity: [0, 1], translateY: ["100px", 0], easing: "easeInOutQuad", delay: 500});

				anime({targets: "#action-select-done-btn", opacity: [0, 1], translateY: ["5rem", "0"], easing: "easeInOutQuad"});
				anime({targets: "#action-select .bottom-bar", opacity: [0, 1], translateY: ["5rem", "0"], easing: "easeInOutQuad"});
			} else if (this.screenActive === "mission-reveal") {
				this.resetBtn(u("#mission-reveal-done-btn"));
				anime({targets: "#mission-reveal .mission-list", opacity: [0, 1], translateY: ["-50px", 0], easing: "easeInOutQuad"});
				anime({targets: "#mission-reveal-done-btn", opacity: [0, 1], translateY: ["5rem", "0"], easing: "easeInOutQuad"});
				anime({targets: "#mission-reveal .bottom-bar", opacity: [0, 1], translateY: ["5rem", "0"], easing: "easeInOutQuad"});
				var voteDivs = u(".vote");
				console.log(voteDivs);
				for (var i = 0; i < voteDivs.length; i++) {
					console.log(voteDivs.nodes[i]);
					var a = anime({targets: voteDivs.nodes[i], opacity: [0, 1], translateY: ["50px", 0], easing: "easeInOutQuad", delay: 1000 * (i+1)});
					if (i === voteDivs.length - 1) {
						a.complete = function () {
							this.missionRevealShown = true;
							this.missions[this.missionId].completed = true;
							this.missions[this.missionId].sabotaged = !this.getMissionResult();
						}.bind(this);
					}
				}
				anime({targets: u("#vote-result-title").first(), opacity: [0, 1], translateY: ["50px", 0], easing: "easeInOutQuad", delay: 1000 * (voteDivs.length) + 1000});
			} else if (this.screenActive === "resistance-win" || this.screenActive === "spy-win") {
				anime({targets: ".win h1", opacity: [0, 1], translateY: ["-50px", 0], easing: "easeInOutQuad"});
				anime({targets: ".win .player-list", opacity: [0, 1], translateY: ["50px", 0], easing: "easeInOutQuad", delay: 500});
				anime({targets: ".win .mission-list", opacity: [0, 1], translateY: ["-50px", 0], easing: "easeInOutQuad"});
			}
		},
		resetPlayerSelections: function () {
			for (var i = 0; i < this.players.length; i++) this.players[i].selected = false;
		},
		selectPlayer: function (player) {
			if (this.screenActive === "team-select") {
				for (var i = 0; i < this.players.length; i++) {
					if (player.name === this.players[i].name) {
						this.players[i].selected = !this.players[i].selected;
					}
				}
			}
		},
		teamSelectDone: function () {
			var selectedPlayers = this.players.filter((player) => {
				return player.selected;
			});

			if (selectedPlayers.length != this.missions[this.missionId].size) {
				return; //Wrong number of players
			} else {
				this.expandBtn("#team-select-done-btn", function () {
					this.screenActive = "team-vote";
					this.screenEnter();
				}, "#f9f9f9");
			}
		},
		passBtnSelected: function () {
			this.voteBtnSelected = true;
			this.passSelected = true;
		},
		failBtnSelected: function () {
			this.voteBtnSelected = true;
			this.passSelected = false;
		},
		voteSelectDone: function () {
			if (this.voteBtnSelected) {
				if (this.passSelected) {
					this.expandBtn("#vote-select-done-btn", function () {
						this.screenActive = "action-select";
						this.selectId = 0;
						this.activeId = this.getSelectedPlayers()[0].id
						this.showPassScreen(this.activeId);
					});
				} else {
					this.expandBtn("#vote-select-done-btn", function () {
						this.missionLeaderId++;
						this.missionLeaderId = this.missionLeaderId % this.players.length;
						this.activeId = this.missionLeaderId;
						this.screenActive = "team-select";
						this.screenEnter();
						this.voteBtnSelected = false;
						for (var i = 0; i < this.players.length; i++) {
							this.players[i].successSelected = false;
							this.players[i].selected = false;
						}
						this.btnClicked = false;
					}, "#ffffff");
				}
			}
		},
		getSelectedPlayers: function () {
			return this.players.filter((player) => {
				return player.selected;
			});
		},
		successActionSelected: function () {
			this.actionSelected = true;
			this.successSelected = true;
		},
		failActionSelected: function () {
			this.actionSelected = true;
			this.successSelected = false;
		},
		actionSelectDone: function () {
			if (this.actionSelected) {
				this.players[this.activeId].successSelected = this.successSelected;
				if (this.selectId === this.missions[this.missionId].size - 1) {
					this.expandBtn("#action-select-done-btn", function () {
						this.selectId = 0;
						this.screenActive = "mission-reveal";
						this.activeId = this.missionLeaderId;
						this.screenEnter();
					}, "#ffffff");
				} else {
					this.expandBtn("#action-select-done-btn", function () {
						this.selectId++;
						this.activeId = this.getSelectedPlayers()[this.selectId].id
						this.showPassScreen(this.activeId);
					});
				}
			}
		},
		getMissionResult: function () {
			var selected = this.getSelectedPlayers();
			var fails = 0;
			for (var i = 0; i < selected.length; i++) {
				if (!selected[i].successSelected) fails++;
			}
			return fails < GAME_ROUNDS[this.players.length].to_fail[this.missionId];
		},
		missionRevealDone: function () {
			if (this.screenActive === "mission-reveal" && this.missionRevealShown) {
				this.missionRevealShown = false;
				var spyWins = 0, resistanceWins = 0;
				for (var i = 0; i < 5; i++) {
					if (this.missions[i].completed) {
						if (this.missions[i].sabotaged) spyWins++;
						else resistanceWins++;
					}
					if (spyWins == 3) {
						this.expandBtn("#mission-reveal-done-btn", function () {
							this.screenActive = "spy-win";
							this.screenEnter();
						}, "#fff");
						return;
					} else if (resistanceWins == 3) {
						this.expandBtn("#mission-reveal-done-btn", function () {
							this.screenActive = "resistance-win";
							this.screenEnter();
						}, "#fff");
						return;
					}
				}
				this.expandBtn("#mission-reveal-done-btn", function () {
					this.missionId++;
					this.missionLeaderId++;
					this.missionLeaderId = this.missionLeaderId % this.players.length;
					this.activeId = this.missionLeaderId;
					this.screenActive = "team-select";
					this.screenEnter();
					this.voteBtnSelected = false;
					for (var i = 0; i < this.players.length; i++) {
						this.players[i].successSelected = false;
						this.players[i].selected = false;
					}
					this.btnClicked = false;
				}, "#ffffff");
			}
		}
	},
	computed: {
		gameInfoMessage: function () {
			var msg = "";
			if (this.players.length < 5) {
				msg = "At least 5 players needed.";
			} else if (this.players.length < 11) {
				msg = this.players.length + " players" + ". " + GAME_ROUNDS[this.players.length].spies + " spies.";
			} else {
				msg = "At most 10 players permitted.";
			}
			return msg;
		},
		validSize: function () {
			var size = this.players.length;
			return size >= 5 && size <= 10;
		},
		currentRole: function () {
			if (this.players.length === 0) return;
			return this.players[this.activeId].role;
		},
		otherSpies: function () {
			return this.players.filter(function (player) {
				return player.role === "spy" && player.name !== this.players[this.activeId].name;
			}.bind(this));

		},
		selectedPlayers: function () {
			return this.players.filter((player) => {
				return player.selected;
			});
		},
		playerVotes: function () {
			var votes = [];
			var successes = 0, fails = 0;
			var selected = this.getSelectedPlayers();
			for (var i = 0; i < selected.length; i++) {
				if (selected[i].successSelected) successes++;
				else fails++;
			}

			for (var i = 0; i < successes; i++) {
				votes.push(true);
			}
			for (var i = 0; i < fails; i++) {
				votes.push(false);
			}
			return votes;
		},
		activeName: function () {
			if (this.players.length === 0) return;
			else return this.players[this.activeId].name;
		},
		passName: function () {
			if (this.players.length === 0) return;
			else return this.players[this.passId].name;
		}
	}
})
