(function () {
	var app = angular.module('game', ['ngRoute']);

	var questions = [
		{question: "What is the most efficient sorting algorithm in terms of time used?", options: ['Bubble Sort', 'Merge Sort', 'Insertion Sort', 'Selection Sort'], ans: 1 },
		{question: "Which of the following is not a programing language?", options: ['Java', 'C', 'Eclipse', 'Boo'], ans: 2 },
		{question: "Which algorithm finds the shortest path of a positively weighted graph?", options: ['Breadth First Search', 'Dijkstra\'s Algorithm', 'Knapsack Algorithm', 'Kadane\'s Algorithm'], ans: 1 },
		{question: "Which of the following theorems were proved by computer-assisted proofs?", options: ['Four-color theorem', 'Fermat\'s Last Theorem', 'Infinite Monkey Theorem', 'Prime Number Theorem'], ans: 0 },
		{question: "What is a Millennium Prize Problem in the field of Computer Science?", options: ['Travelling Salesman Problem', 'P = NP problem', 'Riemann Hypothesis'], ans: 1 },
		{question: "What is the largest integer that can be stored in a 32-bit signed int type?", options: ['256', '1024', '2147483647', '2147483648'], ans: 2 },
		{question: "Which of the following is a solved game?", options: ['Chopsticks', 'Chess', 'Checkers', '2048'], ans: 0 },
		{question: "How much time would it take for a computer to run ~1 000 000 000 operations?", options: ['0.1 seconds', '1 second', '1 minute', '1 hour'], ans: 2 },
		{question: "Which of the following is a solved game?", options: ['Chopsticks', 'Chess', 'Checkers', '2048'], ans: 0 },
		{question: "Which of the following are not operating systems?", options: ['Windows', 'Ubuntu', 'iOS', 'Internet Explorer'], ans: 3 },
		{question: "What is the length of the longest increasing subsequence of the sequence {1, 2, 4, 1, 5, 3, 9}?", options: ['2', '3', '4', '5'], ans: 2 },
		{question: "How many numbers from 1 to 1 000 000 000 end with a 1 in binary?", options: ['250 000 000', '500 000 000', '750 000 000', '1 000 000 000'], ans: 1 },
		{question: "What is the length of the longest palindrome of the string \'abbaabbaaaabbbcccaaa\'?", options: ['3', '4', '5', '8'], ans: 3 },
		{question: "Which of the following is not a prime?", options: ['2147483647', '37', '13323', '2'], ans: 2 },
		{question: "What is the number of different ways a graph of 5 nodes could be connected?", options: ['5', '1024', '2048', '1 048 576'], ans: 1 },
		{question: "What is log base 2 of 1 048 576?", options: ['10', '20', '30', '40'], ans: 1 },
		{question: "What is not an example of a Dynamic Programming problem?", options: ['Knapsack', 'Shortest Path on Graph', 'Travelling Salesman Problem'], ans: 1 },
		{question: "Which of these problems can be solved in polynomial time?", options: ['Knapsack', 'Prime Checking', 'Partition Problem', 'Subset Sum Problem'], ans: 1 },
		{question: "What is log base 2 of 1 048 576?", options: ['10', '20', '30', '40'], ans: 1 },
		{question: "What is the best algorithm to find a list of primes from 1 to N?", options: ['Sieve of Erasthosthenes', 'Trial Division', 'GCD Prime Checking'], ans: 0},
		{question: "What is a data structure for quick update and range sum queries?", options: ['Balanced BST', 'Fenwick Tree', 'Binary Max Heap', 'Heavy Light Decomposition'], ans: 1},
		{question: "Which of the following is not an object-oriented language?", options: ['C++', 'Java', 'Javascript', 'x86 Assembly'], ans: 3},
		{question: "How many bits are there in a byte?", options['1', '2', '4', '8'], ans: 3}

	];

	app.factory('data', function () {
		return {score: 0};
	});
		
	app.controller('TabController', ['$scope', '$rootScope', function ($scope, $rootScope) {
		$scope.state = 0;



		$scope.changeState = function (state) {
			$scope.state = state;

			if ($scope.state === 0) {
				$("#wrapper").animate({top: 160, bottom: 40});
				$("#questionwrapper").fadeIn(1000);
			}

			if ($scope.state === 1) {
				$("#wrapper").animate({top: 60, bottom: -10});
				$("#questionwrapper").fadeIn(1000);
			}

			if ($scope.state === 2) {
				$("#wrapper").animate({top: 120, bottom: -10});
				$("#questionwrapper").fadeIn(1000);
			}
		};

		$rootScope.$on('over', function () {
			$scope.changeState(2);
			console.log('finished');
		});

		$rootScope.$on('submitted', function () {
			$scope.changeState(0);
		})
	}]);
	
	app.controller('ScoreController', ['$scope', 'data', '$rootScope', '$route', function ($scope, data, $rootScope, $route) {
		if (localStorage.attempts === undefined || localStorage.attempts === '') localStorage.attempts = '[]';
		$scope.attempts = JSON.parse(localStorage.attempts);
		if (!$scope.$$phase) $scope.$apply();
		$scope.data = data;

		

		$scope.getAttempt = function (num) {
			if ($scope.attempts[num] === undefined) return '';
			return $scope.attempts[num];
		};

		$scope.addAttempt = function (attempt) {
			$scope.attempts.push(attempt);
			console.log($scope.attempts);
			$scope.attempts.sort(function (a, b) {
				return b.score - a.score;
			});
			if (!$scope.$$phase) $scope.$apply();
			console.log(attempt);
			localStorage.attempts = JSON.stringify($scope.attempts);
			window.location.reload(false); 
		};

		$scope.finish = function () {
			var score = $scope.data.score;
			var username = $("#name").val();
			if (username == '') username = 'anon';
			$scope.addAttempt({score: score, name: username});
			$rootScope.$emit('submitted');
		}
	}]);
	
	app.controller('QuestionController', ['data', '$rootScope', function (data, $rootScope) {
		this.questions = questions;
		this.numQuestions = 10;
		this.currentQuestionNo = 0;
		this.score = 0;
		this.data = data;

		this.selectQuestions = function () {
			var arr = [];

			for (var i = 0; i < this.questions.length; i++) {
				if (i < this.numQuestions) {
					arr.push(this.questions[i]);
				} else {
					var r = Math.floor(Math.random() * i)
					if (r < this.numQuestions) {
						arr[r] = this.questions[i];
					}
				}
			}

			return arr;
		};

		this.questionsUsed = this.selectQuestions();

		this.currentQuestion = function () {
			return this.questionsUsed[this.currentQuestionNo];
		};

		this.submitAnswer = function (answer) {
			if (this.currentQuestion().ans === answer) {
				this.score += 10;
			} else {
				this.score -= 5;
			}
			this.nextQuestion();
		};

		this.nextQuestion = function () {
			this.currentQuestionNo++;
			if (this.currentQuestionNo === this.numQuestions) {
				this.data.score = this.score;
				this.score = 0;
				this.currentQuestionNo = 0;
				this.questionsUsed = this.selectQuestions();
				$rootScope.$emit('over');
			}
			$("#question, #options").fadeOut(0).fadeIn(300);
		};
	}]);

})();