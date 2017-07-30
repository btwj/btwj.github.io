(function () {
//Regime stats
var might = 10; //0 to 100
var resources = 15; //cap at 50

var internal_instability = 0;
var event_done = true;

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//Minister stats
var m_ids = {INT: 0, TRU: 1, SEC: 2, PRO: 3}
var names = ["Minister of Intelligence", "Minister of Truth", "Minister of Security", "Minister of Production"];
var approval = [0, 0, 0, 0];
var strength = [50, 50, 50, 50];

var opinions = [];

var resource_collected = [false, false, false, false];
var bribed = [false, false, false, false];
var executed = [false, false, false, false];

DOM.svg.relationship_lines = [];
for (var i = 0; i < 4; i++) {
    var arr = [];
    var arr2 = [];
    for (var j = 0; j < 4; j++) {
        arr.push(0);
        arr2.push(undefined);
    }
    opinions.push(arr);
    DOM.svg.relationship_lines.push(arr2);
}

var change_opinion = function(i, j, value) {
    if (i == j) return;
    opinions[i][j] += value;
    opinions[j][i] = opinions[i][j] = Utils.limit(opinions[i][j], -50, 50);
}

var change_approval = function(i, value) {
    approval[i] = Utils.limit(approval[i] + value, -50, 50);
}

var change_strength = function(i, value) {
    strength[i] = Utils.limit(strength[i] + value, 0, 100);
}

var change_rebellion = function(value) {
    rebellion = Utils.limit(rebellion + value, 0, 100);
}

var change_happiness = function(value) {
    happiness = Utils.limit(happiness + value, 0, 99);
}

var change_satiation = function(value) {
    satiation = Utils.limit(satiation + value, 0, 99);
}

var change_resources = function(value) {
    resources = Utils.limit(resources + value, 0, 50);
}

var change_faith = function(value) {
    faith = Utils.limit(faith + value, 0, 99);
}

var change_might = function(value) {
    might = Utils.limit(might + value, 0, 99);
}

for (var i = 0; i < 4; i++) {
    approval[i] = _.random(-10, 30);
}

for (var i = 0; i < 6; i++) {
    change_opinion(_.random(0, 3), _.random(0, 3), _.random(-15, 15));
}

var lose = function (lose_reason) {
    $(DOM.lose_reason).text(lose_reason);
    $(DOM.lose_time).text("You reigned for " + week + " weeks.");
    $(DOM.lose_screen).addClass("active");
}

//People stats
var rebellion = 0; //0 to 100
var happiness = 50; //0 to 100
var satiation = 50; //0 t0 100
var faith = 0; //0 to 100

//Game stats
var week = 0;

var fillers = [
    "All flags have been ordered to half-mast as the dictator stubbed his toe on a table. The table has since been executed.",
    "Twenty people have been arrested for causing unrest, police officials say. Coincidentally, the nation's population has fallen by twenty.",
    "All triangular foods are now banned, following a corner-related accident at the dictator's residence.",
    "The world trembles in fear as the DPRE launches its third ICBM into the Pacific Ocean. 'The fishes are evil', the nation's nuclear director explains.",
    "The DPRE continues its string of successful manned spaceflights to the sun. 'The key is to travel at night', says the country's top astronaut.",
    "Two people have been spotted causing unrest. As of publication, these people have been liberated from their state of mind.",
    "The DPRE continues to be a beacon of freedom in an oppressed world, states the Minister of Truth.",
    "The DPRE has banned the use of sarcasm. What a excellent idea.",
    "The DPRE's most recent missile launch has not been successful to a satisfactory extent. Officials blame projectile dysfunction.",
    "The DPRE is just three months away from enriching weapons-grade uranium. As for human-grade food, the DPRE is working hard on that too.",
    "An interesting tidbit of DPRE history - the dictator was born at the end of a double rainbow, on a unicorn.",
    "A survey has found that citizens of DPRE are the happiest in the world. They are found to be especially happy when in proximity to a rifle.",
    "New research has shown that DPRE citizens are the hardest-working in the world. Employers attributed this to attractive incentives, such as not getting shot.",
    "Tourists who visit will be happy to learn about our citizens and their livelihoods. When asked about life here, a citizen responded, 'Well I can't complain.'",
    "DPRE scientists are the most experienced in the world. In no other country are scientists given so many resources and luxuries, such as the luxury of an alive family member.",
    "The DPRE has been making strides in nuclear energy. Unfortunately, the DPRE has been unable to harness that energy for any time longer than ten seconds.",
    "A new study finds that citizens of the DPRE are the richest in the world. Richest in life experience and culture.",
    "The DPRE has once again swept all the medals at the Olympic Games. This is undoubtedly due to the excellent food and nutrition available here.",
];

var events = [
    {
        title: "Ambition",
        fn: function() {
            var obj = {};
            for (var i = 0; i < 4; i++) {
                if (Math.random() < 0.2 && strength[i] > 70) {
                    obj.id = i; obj.name = names[i];
                    break;
                }
            }
            if (obj.id === undefined) return false;
            return obj;
        },
        text: "The {name} envies your position as dictator. He thinks he's strong enough to take your place.",
        choices: [{
            title: "I'll like to see you try!",
            tooltip: "{name}'s approval of you drops.",
            result: function(obj) {
                change_approval(obj.id, _.random(-30, -20));
            }
        }]
    },
    {
        title: "Jealousy",
        fn: function() {
            var obj = {};
            if (Math.random() < 0.04) {
                var id1 = _.random(0, 3);
                var id2 = id1;
                while (id2 == id1) {
                    id2 = _.random(0, 3);
                }
                obj.id1 = id1; obj.id2 = id2; obj.name1 = names[id1]; obj.name2 = names[id2];
            } else return false;
            return obj;
        },
        text: "The {name2} was caught cheating with the {name1}'s wife! Their relationship is ruined.",
        choices: [{
            title: "Petty.",
            tooltip: "Relationship between {name1} and {name2} is damaged.",
            result: function(obj) {
                change_opinion(obj.id1, obj.id2, _.random(-30, -50));
            }
        }]
    },
    {
        title: "Blight",
        fn: function() {
            return Math.random() < 0.02;
        },
        text: "A plague has damaged the food supply severely.",
        choices: [{
            title: "Hoard food. The people will die.",
            tooltip: "Satiation decreases. Happiness decreases.",
            result: function(obj) {
                change_satiation(-20);
                change_happiness(-30);
            }
        }, {
            title: "Try your best to save the people.",
            tooltip: "Satiation decreases. Happiness increases, but resources are used.",
            result: function(obj) {
                change_satiation(-10);
                change_happiness(10);
                change_resources(-10);
            }
        }]
    }, {
        title: "Statue",
        fn: function() {
            return Math.random() < 0.03;
        },
        text: "Your advisors suggest you construct a golden statue of yourself in the city.",
        choices: [{
            title: "Great idea!",
            tooltip: "Uses resources. People's faith increases.",
            result: function(obj) { change_resources(-15); change_faith(25); }
        }, {
            title: "What a waste of money.",
            tooltip: "Nothing happens.",
            result: function(obj) {}
        }]
    }, {
        title: "Slander",
        fn: function() {
            var person = _.random(0, 3);
            if (Math.random() < 0.05 && approval[person] < 0) {
                return { id: person, name: names[person] };
            }
            return false;
        },
        text: "{name} has been badmouthing you behind your back!",
        choices: [{
            title: "Oh well.",
            tooltip: "Your approval among the ministers decreases a bit.",
            result: function(obj) { for (var i = 0; i < 4; i++) { if (i != obj.id) change_approval(i, _.random(-5, -10))}}
        }, {
            title: "Strip him of his powers.",
            tooltip: "His strength decreases significantly. Your approval among the ministers decreases more.",
            result: function(obj) {
                change_strength(obj.id, _.random(-20, -25));
                for (var i = 0; i < 4; i++) {
                    if (i != obj.id) change_approval(i, _.random(-10, -15))
                }
            }
        }]
    }, {
        title: "Resources Found",
        fn: function () {
            var id = _.random(0, 3);
            if (Math.random() < 0.03) return { id: id, name: names[id] };
            else return false;
        },
        text: "As {name} was returning home, he stumbled upon a bunch of resources by the road. 'It was quite remarkable', he said. 'I found two bushels of hay and a Panzer!'",
        choices: [{
            title: "Delightful!",
            tooltip: "You gain some resources.",
            result: function(obj) {change_resources(_.random(5, 10))}
        }]
    }, {
        title: "Minor Spat",
        fn: function() {
            var obj = {};
            if (Math.random() < 0.06) {
                var id1 = _.random(0, 3);
                var id2 = id1;
                while (id2 == id1) {
                    id2 = _.random(0, 3);
                }
                obj.id1 = id1; obj.id2 = id2; obj.name1 = names[id1]; obj.name2 = names[id2];
            } else return false;
            return obj;
        },
        text: "The {name1} and {name2} got into an argument.",
        choices: [{
            title: "Alright then.",
            tooltip: "Relationship between {name1} and {name2} is damaged.",
            result: function(obj) {
                change_opinion(obj.id1, obj.id2, _.random(-15, -20));
            }
        }]
    }, {
        title: "Joint Efforts",
        fn: function() {
            var obj = {};
            if (Math.random() < 0.04) {
                var id1 = _.random(0, 3);
                var id2 = id1;
                while (id2 == id1) {
                    id2 = _.random(0, 3);
                }
                obj.id1 = id1; obj.id2 = id2; obj.name1 = names[id1]; obj.name2 = names[id2];
            } else return false;
            return obj;
        },
        text: "The {name1} and {name2} have collaborated on a joint project together.",
        choices: [{
            title: "Great.",
            tooltip: "Relationship between {name1} and {name2} is improved.",
            result: function(obj) {
                change_opinion(obj.id1, obj.id2, _.random(5, 15));
            }
        }]
    }, {
        title: "The People are Restless",
        fn: function() {
            return Math.random() < 0.04;
        },
        text: "The population is growing tired of your rule.",
        choices: [{
            title: "I've grown tired of them too!",
            tooltip: "Rebellion increases. Happiness decreases.",
            result: function(obj) {
                change_happiness(_.random(-10, -15));
                change_rebellion(_.random(10, 15));
            }
        }]
    }, {
        title: "Minister Dies",
        fn: function() {
            var id = _.random(0, 3);
            if (Math.random() < 0.02) return { id: id, name: names[id] };
            return false;
        },
        text: "The {name} passed away.",
        choices: [{
            title: "I am saddened.",
            tooltip: "The {name} dies.",
            result: function(obj) {
                kill(obj.id);
            }
        }]
    }, {
        title: "Incriminating Evidence",
        fn: function() {
            var obj = {};
            if (Math.random() < 0.06) {
                var id1 = _.random(0, 3);
                var id2 = id1;
                while (id2 == id1) {
                    id2 = _.random(0, 3);
                }
                obj.id1 = id1; obj.id2 = id2; obj.name1 = names[id1]; obj.name2 = names[id2];
            } else return false;
            return obj;
        },
        text: "You've obtained incriminating information that {name1} has been undermining {name2}'s authority!",
        choices: [{
            title: "Spread it.",
            tooltip: "Relationship between {name1} and {name2} is damaged. Approval of {name1} decreases",
            result: function(obj) {
                change_opinion(obj.id1, obj.id2, _.random(-15, -20));
            }
        }, {
            title: "Threaten him for resources.",
            tooltip: "Approval of {name1} decreases. Gain resources.",
            result: function(obj) {
                change_approval(obj.id1, _.random(-15, -10));
                change_resources(_.random(5, 10));
            }
        }, {
            title: "Threaten him for support.",
            tooltip: "Approval of {name1} increases.",
            result: function(obj) {
                change_approval(obj.id1, _.random(15, 20));
            }
        }]
    }, {
        title: "Council Struggle",
        fn: function() {
            return Math.random() < 0.05;
        },
        text: "Hidden tensions within the council have inflamed, and now everyone suspects each other.",
        choices: [{
            title: "Why can't everyone get along?",
            tooltip: "Relationships are damaged.",
            result: function(obj) {
                for (var i = 0; i < 6; i++) {
                    change_opinion(_.random(0, 3), _.random(0, 3), _.random(-10, -15));
                }
            }
        }]
    }, {
        title: "Resources Stolen",
        fn: function() {
            return Math.random() < 0.03;
        },
        text: "Your resources have been stolen!",
        choices: [{
            title: "I hate thieves!",
            tooltip: "Resources decrease.",
            result: function(obj) {
                change_resources(_.random(-4, -8));
            }
        }]
    }, {
        title: "Council Meeting",
        fn: function() {
            return Math.random() < 0.03;
        },
        text: "You and your council have met to discuss the important issues facing the nation.",
        choices: [{
            title: "Focus on the military!",
            tooltip: "Minister of Security approves of this. Gain might.",
            result: function(obj) {
                change_approval(m_ids.SEC, _.random(5, 10));
                change_might(10);
            }
        }, {
            title: "Focus on our agriculture!",
            tooltip: "Minister of Production approves of this. Gain satiation.",
            result: function(obj) {
                change_approval(m_ids.PRO, _.random(5, 10));
                change_satiation(10);
            }
        }, {
            title: "Focus on propaganda!",
            tooltip: "Minister of Truth approves of this. Gain faith.",
            result: function(obj) {
                change_approval(m_ids.TRU, _.random(5, 10));
                change_faith(20);
            }
        }, {
            title: "Kill the rebellion!",
            tooltip: "Minister of Intelligence approves of this. Rebellion is suppressed.",
            result: function(obj) {
                change_approval(m_ids.INT, _.random(5, 10));
                change_rebellion(-20);
            }
        }]
    }
];

var execute = function (id) {
    kill(id);
    for (var i = 0; i < 4; i++) {
        if (i != id) change_approval(i, -10);
    }
    render();
}

var kill = function (id) {
    for (var i = 0; i < 4; i++) {
        opinions[i][id] = opinions[id][i] = Math.floor(opinions[i][id] / 3);
        change_opinion(i, id, _.random(-25, 25));
    }
    approval[id] = _.random(-30, 30); 
    render();
}

var step = function () {
    if (!event_done) {
        Utils.log("You can't go to the next week if you haven't completed this week's event.");
        return;
    }

    event_done = false;

    bribed = [false, false, false, false];
    executed = [false, false, false, false];
    resource_collected = [false, false, false, false];

    happiness += (satiation - 30)/15;
    happiness += faith/10;

    satiation -= 3;
    faith -= 1;

    resources += _.random(2, 4);

    var rebellion_change = 0;
    if (happiness < 10) rebellion_change += 1;
    if (satiation < 10) rebellion_change += 4;
    if (faith < 15) rebellion_change += 2;
    if (faith < 30) rebellion_change += 1;
    if (faith < 10) rebellion_change = Math.floor(rebellion_change * 1.5);

    if (happiness > 50) {
        rebellion_change -= 3;
        if (faith > 30) rebellion_change = Math.floor(rebellion_change * (1 + faith / 50));
    }

    happiness = Math.floor(Utils.limit(happiness, 0, 99));
    rebellion = Utils.limit(rebellion + rebellion_change, 0, 100);
    satiation = Math.floor(Utils.limit(satiation, 0, 99));
    faith = Math.floor(Utils.limit(faith, 0, 99));
    might = Utils.limit(might, 0, 100);
    resources = Utils.limit(resources, 0, 50);

    week += 1;

    //Relationship dynamics
    var new_opinions = new Array(4);
    for (var i = 0; i < 4; i++) {
        new_opinions[i] = new Array(4);
    }

    var new_approval = new Array(4);

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            new_opinions[i][j] = new_opinions[j][i] = opinions[i][j];
        }
    }

    for (var i = 0; i < 4; i++) {
        new_approval[i] = approval[i];
        for (var j = 0; j < 4; j++) {
            if (i == j) continue;
            if (approval[j] > 30 && opinions[i][j] > 20) {
                new_approval[i] += _.random(0, 1);
            }
            if (approval[j] < -30 && opinions[i][j] < -20) {
                new_approval[i] += _.random(0, 1);
            }
            if (approval[j] > 30 && opinions[i][j] < -20) {
                new_approval[i] += _.random(-2, 0);
            }
            if (approval[j] < -30 && opinions[i][j] > 20) {
                new_approval[i] += _.random(-1, 0);
            }

            for (var k = 0; k < 4; k++) {
                if (i == j || j == k) continue;
                if (opinions[i][j] < 0 && opinions[j][k] < 0) {
                    new_opinions[i][k] += _.random(-1, 2);
                }
                if (opinions[i][j] > 0 && opinions[j][k] > 0) {
                    new_opinions[i][k] += _.random(-1, 2);
                }
                if (opinions[i][j] > 0 && opinions[j][k] < 0) {
                    new_opinions[i][k] += _.random(-2, 1);
                }
                new_opinions[k][i] = new_opinions[i][k];
            }

        }
    }

    for (var i = 0; i < 4; i++) {
        approval[i] = Utils.limit(new_approval[i] + _.random(-1, 1), -50, 50);
        for (var j = 0; j < 4; j++) {
            opinions[i][j] = Utils.limit(new_opinions[i][j] + _.random(-1, 1), -50, 50);
        }
        //Too strong, negative approval
        if (strength[i] > 65) {
            change_approval(i, -(strength[i] - 60) / 10);
        }
    }

    for (var i = 0; i < 4; i++) {
        if (Math.random < 0.1) {
            change_opinion(i, _.random(0, 3), _.random(-10, 5));
        }
    }

    //Strength dynamics
    //Natural decay to 50

    for (var i = 0; i < 4; i++) {
        strength[i] += Math.floor((50 - strength[i]) / 15.0);
    }

    //Internal Coups
    for (var i = 0; i < 4; i++) {
        var enemy_strength = 0;
        var enemies = [];
        for (var j = 0; j < 4; j++) {
            if (i == j) continue;
            else if (opinions[i][j] < -20 && strength[j] >= 20) {
                enemy_strength += -(opinions[i][j] / 50.0) * strength[j];
                enemies.push(j);
            }
        }
        if (enemy_strength > strength[i]) {
            if (Math.random() < 0.5) {
                kill(i);
                Utils.log("<b>The " + names[i] + " has been assassinated by the other ministers!</b>");
                for (var j = 0; j < enemies.length; j++) {
                    change_strength(enemies[j], -20);
                }
                internal_instability += Math.random() * 5;
                break;
            }
        }
    }

    //Friendly strength
    for (var i = 0; i < 4; i++) {
        var friend_strength = 0;
        for (var j = 0; j < 4; j++) {
            if (opinions[i][j] > 0) {
                friend_strength += (opinions[i][j] / 50.0) * strength[i];
            }
        }
        if (friend_strength > might) {
            change_approval(i, _.random(-2, 0));
        }
    }

    //Overthrow
    var overthrow_strength = 0;
    for (var i = 0; i < 4; i++) {
        if (approval[i] < -10) {
            overthrow_strength += -(approval[i] + 10) / 40.0 * strength[i];
        }
    }

    internal_instability += _.random(-0.5, 0.5);

    if (overthrow_strength < 10) {
        internal_instability -= internal_instability/5;
    } else {
        internal_instability += overthrow_strength * (150.0 - might)/100 * 0.2;
    }

    if (approval[m_ids.INT] > 10 && internal_instability > 0.5 * might) {
        Utils.log("The Minister of Intelligence warns you that an internal coup is happening!");
    }

    if (internal_instability > might * 2) {
        if (Math.random() < 0.3) {
            lose("You were overthrown by your ministers.");
        }
    }

    if (rebellion > 90) {
        Utils.log("Your rebellion is very high!")
        if (Math.random() < 0.2) {
            lose("Your people rebelled and overthrew you.");
        }
    } else if (rebellion > might) {
        Utils.log("Be careful! Your rebellion is stronger than your might!");
        if (Math.random() < (rebellion - might) / 800.0) {
            lose("Your people rebelled and overthrew you.");
        }
    }

    //Events
    var event_nos = [];
    for (var i = 0; i < events.length; i++) event_nos.push(i);
    var shuffled_nos = _.shuffle(event_nos);
    var event_chosen = false;

    for (var i = 0; i < shuffled_nos.length; i++) {
        var cur_event_id = shuffled_nos[i];
        var cur_event = events[cur_event_id];
        var obj = cur_event.fn();
        if (obj === false) continue;
        else {
            event_chosen = true;
            var event_dom = $("<div class='log event'/>");
            event_dom.append($("<div class='title'/>").text(cur_event.title));
            event_dom.append($("<div class='text'/>").text(cur_event.text.supplant(obj)));
            var choices_dom = $("<div class='choices'/>");
            for(let j = 0; j < cur_event.choices.length; j++) {
                var choice_dom = $("<div class='choice'/>");
                choice_dom.text(cur_event.choices[j].title);
                choice_dom.attr('title', cur_event.choices[j].tooltip.supplant(obj));
                tippy(choice_dom[0]);
                choice_dom.on('click', function () {
                    if (!event_done && !$(this).parents(".log.event").hasClass("completed")) {
                        event_done = true;
                        cur_event.choices[j].result(obj);
                        $(this).css("font-weight", "bold");
                        $(this).parents(".log.event").addClass("completed");
                        render();
                    }
                });
                choices_dom.append(choice_dom);
            }
            event_dom.append(choices_dom);
            $(DOM.logs).prepend(event_dom);
            break;
        }
    }

    if (!event_chosen) {
        event_done = true;
        if (Math.random() < 0.3) Utils.log(_.sample(fillers));
    }
    render();
};

var web_svg = SVG('web').size(320, 320);
var offsets = [[80, 80], [240, 80], [80, 240], [240, 240]];

DOM.svg.portraits = [];
DOM.svg.execute_buttons = [];
DOM.svg.bribe_buttons = [];
DOM.svg.resource_buttons = [];

for (var i = 0; i < 4; i++) {
    for (var j = 0; j < i; j++) {
        var line = web_svg.line(offsets[i][0], offsets[i][1], offsets[j][0], offsets[j][1]);
        line.stroke({ width: 5 });
        DOM.svg.relationship_lines[i][j] = line;
        DOM.svg.relationship_lines[j][i] = line;
    }
}

web_svg.use('spy-svg', 'img/spy.svg').size(100, 100).transform({ x: 30, y: 30 });
web_svg.use('truth-svg', 'img/truth.svg').size(100, 100).transform({ x: 190, y: 30 });
web_svg.use('security-svg', 'img/security.svg').size(100, 100).transform({ x: 30, y: 190 });
web_svg.use('production-svg', 'img/production.svg').size(100, 100).transform({ x: 190, y: 190 });
for (var i = 0; i < 4; i++) {
   
    if (i != 0) {
        var execute_button = web_svg.use('execute-svg', 'img/execute.svg').size(30, 30).transform({ x: offsets[i][0] - 40 - 15, y: offsets[i][1] + 40 - 15 });
        execute_button.attr('class', 'tip');
        execute_button.attr('title', "Execute minister. The Minister of Intelligence must like you more than he likes him for assassination.")
        execute_button.data('id', i);
        execute_button.style('cursor', 'pointer');
        execute_button.click(function() {
            var id = this.data('id');
            
            if (id == m_ids.INT) return;
            if (!executed[id]) {
                if (opinions[m_ids.INT][id] > approval[m_ids.INT]) {
                    Utils.log("The Minister of Intelligence likes " + names[id] + " more than he likes you. He's not going to assassinate him.");
                } else {
                    execute(id);
                    executed[id] = true;
                    Utils.log("<b>" + names[id] + " was executed! </b> This has lowered the other ministers' opinion of you, and has affected the relationships between ministers.");
                }
            } else {
                Utils.log("You've already executed " + names[id] + " this week! Please calm down.")
            }
        });
        DOM.svg.execute_buttons.push(execute_button);
    }
    
    var bribe_button = web_svg.use('bribe-svg', 'img/bribe.svg').size(30, 30).transform({ x: offsets[i][0] + 40 - 15, y: offsets[i][1] + 40 - 15 });
    bribe_button.data('id', i);
    bribe_button.attr('class', 'tip');
    bribe_button.attr('title', "Spend 10 resources to bribe this minister, which increases his approval of you.");
    bribe_button.click(function() {
        var id = this.data('id');

        if (resources < 10) {
            Utils.log("You're too poor to bribe this minister! He has standards too, you know.");
        } else if (bribed[id]) {
            Utils.log("You've already bribed this minister this week!");
        }

        if (resources >= 10 && !bribed[id]) {
            Utils.log("<b>You've bribed the " + names[id] + "!</b>" + " This increases his approval of you.");
            resources -= 10;
            change_approval(id, _.random(15, 30));
            change_strength(id, 5);
            render();
            bribed[id] = true;
        }
    });
    DOM.svg.bribe_buttons.push(bribe_button);

    var resource_button = web_svg.use('collect-svg', 'img/collect.svg').size(30, 30).transform({ x: offsets[i][0] - 40 - 15, y: offsets[i][1] - 40 - 15 });
    resource_button.attr('class', 'tip');
    var tooltip = "";
    switch(i) {
        case m_ids.INT:
            tooltip = "Suppress rebellions in exchange for resources and approval."; break;
        case m_ids.TRU:
            tooltip = "Increase the population's faith in exchange for resources and approval."; break;
        case m_ids.SEC:
            tooltip = "Increase your might in exchange for resources and approval."; break;
        case m_ids.PRO:
            tooltip = "Increase the population's satiation in exchange for resources and approval."; break;
    }
    resource_button.attr('title', tooltip);
    resource_button.data('id', i);
    resource_button.style('cursor', 'pointer');
    resource_button.click(function() {
        var id = this.data('id');
        if (approval[id] <= -30) {
            Utils.log("The Minister hates you too much for this!")
        } else if (resource_collected[id]) {
            Utils.log("You've already asked this week!")
        } else if (resources < 5) {
            Utils.log("You don't have enough resources!");
        }
        if (approval[id] > -30 && !resource_collected[id] && resources >= 5) {
            change_approval(id, -5);
            resources = Utils.limit(resources - 10, 0, 50);
            resource_collected[id] = true;
            if (id == m_ids.INT) {
                Utils.log("<b>The Ministry of Intelligence has slowed down the rebellion!</b>");
                rebellion = Utils.limit(rebellion - 10, 0, 100);
            } else if (id == m_ids.TRU) {
                Utils.log("<b>The Ministry of Truth has made the population belive in you!</b>");
                faith = Utils.limit(faith + 10, 0, 100);
            } else if (id == m_ids.PRO) {
                Utils.log("<b>The Ministry of Production has produced more food for the people!</b>");
                satiation = Utils.limit(satiation + 20, 0, 100);
            } else if (id == m_ids.SEC) {
                Utils.log("<b>The Ministry of Security has built up your defence!</b>")
                might = Utils.limit(might + 10, 0, 100);
            }

            change_strength(id, 10);
        }
        render();
    });
    DOM.svg.resource_buttons.push(resource_button);
}

var render = function () {
    DOM.resources.textContent = "" + resources;
    $(DOM.might).css("width", "" + might + "%");

    DOM.happiness.textContent = "" + happiness;
    DOM.satiation.textContent = "" + satiation;
    DOM.faith.textContent = "" + faith;

    for (var i = 0; i < 4; i++) {
        for (var j = i + 1; j < 4; j++) {
            if (opinions[i][j] === 0) {
                DOM.svg.relationship_lines[i][j].stroke({ width: 5, color: '#f1c40f' });
            } else if (opinions[i][j] > 0) {
                DOM.svg.relationship_lines[i][j].stroke({ width: 3 * Math.ceil(opinions[i][j] / 10.0), color: '#2ecc71', dasharray: "" });
            } else {
                DOM.svg.relationship_lines[i][j].stroke({ width: 3 * Math.ceil(-opinions[i][j] / 10.0), color: '#e74c3c', dasharray: "5, 5" });
            }
        }
    }

    for (var i = 0; i < 4; i++) {
        var stats_dom = document.getElementById("minister-" + i);
        var minister_approval_pb = $(stats_dom.querySelector(".minister-approval-pb"));
        minister_approval_pb.css("width", "" + (approval[i] + 50) + "%");
        if (approval[i] > 0) {
            minister_approval_pb.css("background-color", "#006442");
        } else if (approval[i] < 0) {
            minister_approval_pb.css("background-color", "#8F1D21");
        } else {
            minister_approval_pb.css("background-color", "#333");
        }

        var minister_strength_pb = $(stats_dom.querySelector(".minister-strength-pb"));
        minister_strength_pb.css("width", "" + (strength[i]) + "%");
        if (strength[i] > 0) {
            minister_strength_pb.css("background-color", "#006442");
        } else if (strength[i] < 0) {
            minister_strength_pb.css("background-color", "#8F1D21");
        } else {
            minister_strength_pb.css("background-color", "#333");
        }
    }

    $(DOM.rebellion).css("width", "" + rebellion + "%");
    var date_str = "";
    var year = Math.floor(week / 48) + 2020;
    var month = Math.floor((week - (year - 2020) * 48) / 4);
    var week_num = week % 4 + 1;
    date_str = "" + year + ", " + months[month] + ", " + "Week " + week_num;
    $(DOM.calendar_date).text(date_str);
};

Utils.log("Welcome!");

$(DOM.btn_step).on('click', function () {
    step();
});

$(DOM.btn_play_again).on('click', function () {
    location.reload();
});

render();
})();