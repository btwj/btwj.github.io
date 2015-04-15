$(document).ready(function () {
	var elements = ['Sc', 'Y', 'La', 'Ce', 'Pr', 'Nd', 'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 'Lu'];

	var names = {
		'Sc': "Scandium",
		'Y': "Yttrium",
		'La': "Lanthanum",
		'Ce': "Cerium",
		'Pr': "Praseodymium",
		'Nd': "Neodymium",
		'Pm': "Promethium",
		'Sm': "Samarium",
		'Eu': "Europium",
		'Gd': "Gadolinium",
		'Tb': "Terbium",
		'Dy': "Dysprosium",
		'Ho': "Holmium",
		'Er': "Erbium",
		'Tm': "Thulium",
		'Yb': "Ytterbium",
		'Lu': "Lutetium"
	}

	var info = {
		'La': "Lanthanum is used to make nickle-metal hydride batteries.",
		'Pr': "Praseodymium is used with neodymium to create magnets.",
		'Nd': "Neodymium is widely used to make NdFeB magnets, which are important in a variety of applications, such as in generators, motors and speakers.",
		'Er': "Erbium is used in making glass fibres for signal amplification, used in optical communication."
	}

	var elementsDiv = $("#elements");

	elements.forEach(function (cur) {

		var curDiv = $("<div class='element'/>");

		curDiv.data('el', cur);
		curDiv.text(cur);
		elementsDiv.append(curDiv);

		curDiv.click(function () {
			var el = $(this).data('el');

			$("#info h5").text(names[el]);
			$("#info p").text(info[el] ? info[el] : "");
		})
	});
})