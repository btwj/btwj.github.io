var algorithms={"102020":"ADLER-32", "102040":"CRC-32", "102060":"CRC-32B", "101020":"CRC-16", "101040":"CRC-16-CCITT", "104020":"DES(Unix)", "101060":"FCS-16", "103040":"GHash-32-3", "103020":"GHash-32-5", "115060":"GOST R 34.11-94", "109100":"Haval-160", "109200":"Haval-160(HMAC)", "110040":"Haval-192", "110080":"Haval-192(HMAC)", "114040":"Haval-224", "114080":"Haval-224(HMAC)", "115040":"Haval-256", "115140":"Haval-256(HMAC)", "107080":"Lineage II C4", "106025":"Domain Cached Credentials - MD4(MD4(($pass)).(strtolower($username)))", "102080":"XOR-32", "105060":"MD5(Half)", "105040":"MD5(Middle)", "105020":"MySQL", "107040":"MD5(phpBB3)", "107060":"MD5(Unix)", "107020":"MD5(Wordpress)", "108020":"MD5(APR)", "106160":"Haval-128", "106165":"Haval-128(HMAC)", "106060":"MD2", "106120":"MD2(HMAC)", "106040":"MD4", "106100":"MD4(HMAC)", "106020":"MD5", "106080":"MD5(HMAC)", "106140":"MD5(HMAC(Wordpress))", "106029":"NTLM", "106027":"RAdmin v2.x", "106180":"RipeMD-128", "106185":"RipeMD-128(HMAC)", "106200":"SNEFRU-128", "106205":"SNEFRU-128(HMAC)", "106220":"Tiger-128", "106225":"Tiger-128(HMAC)", "106240":"md5($pass.$salt)", "106260":"md5($salt.'-'.md5($pass))", "106280":"md5($salt.$pass)", "106300":"md5($salt.$pass.$salt)", "106320":"md5($salt.$pass.$username)", "106340":"md5($salt.md5($pass))", "106360":"md5($salt.md5($pass).$salt)", "106380":"md5($salt.md5($pass.$salt))", "106400":"md5($salt.md5($salt.$pass))", "106420":"md5($salt.md5(md5($pass).$salt))", "106440":"md5($username.0.$pass)", "106460":"md5($username.LF.$pass)", "106480":"md5($username.md5($pass).$salt)", "106500":"md5(md5($pass))", "106520":"md5(md5($pass).$salt)", "106540":"md5(md5($pass).md5($salt))", "106560":"md5(md5($salt).$pass)", "106580":"md5(md5($salt).md5($pass))", "106600":"md5(md5($username.$pass).$salt)", "106620":"md5(md5(md5($pass)))", "106640":"md5(md5(md5(md5($pass))))", "106660":"md5(md5(md5(md5(md5($pass)))))", "106680":"md5(sha1($pass))", "106700":"md5(sha1(md5($pass)))", "106720":"md5(sha1(md5(sha1($pass))))", "106740":"md5(strtoupper(md5($pass)))", "109040":"MySQL5 - SHA-1(SHA-1($pass))", "109060":"MySQL 160bit - SHA-1(SHA-1($pass))", "109180":"RipeMD-160(HMAC)", "109120":"RipeMD-160", "109020":"SHA-1", "109140":"SHA-1(HMAC)", "109220":"SHA-1(MaNGOS)", "109240":"SHA-1(MaNGOS2)", "109080":"Tiger-160", "109160":"Tiger-160(HMAC)", "109260":"sha1($pass.$salt)", "109280":"sha1($salt.$pass)", "109300":"sha1($salt.md5($pass))", "109320":"sha1($salt.md5($pass).$salt)", "109340":"sha1($salt.sha1($pass))", "109360":"sha1($salt.sha1($salt.sha1($pass)))", "109380":"sha1($username.$pass)", "109400":"sha1($username.$pass.$salt)", "1094202":"sha1(md5($pass))", "109440":"sha1(md5($pass).$salt)", "109460":"sha1(md5(sha1($pass)))", "109480":"sha1(sha1($pass))", "109500":"sha1(sha1($pass).$salt)", "109520":"sha1(sha1($pass).substr($pass,0,3))", "109540":"sha1(sha1($salt.$pass))", "109560":"sha1(sha1(sha1($pass)))", "109580":"sha1(strtolower($username).$pass)", "110020":"Tiger-192", "110060":"Tiger-192(HMAC)", "112020":"md5($pass.$salt) - Joomla", "113020":"SHA-1(Django)", "114020":"SHA-224", "114060":"SHA-224(HMAC)", "115080":"RipeMD-256", "115160":"RipeMD-256(HMAC)", "115100":"SNEFRU-256", "115180":"SNEFRU-256(HMAC)", "115200":"SHA-256(md5($pass))", "115220":"SHA-256(sha1($pass))", "115020":"SHA-256", "115120":"SHA-256(HMAC)", "116020":"md5($pass.$salt) - Joomla", "116040":"SAM - (LM_hash:NT_hash)", "117020":"SHA-256(Django)", "118020":"RipeMD-320", "118040":"RipeMD-320(HMAC)", "119020":"SHA-384", "119040":"SHA-384(HMAC)", "120020":"SHA-256", "121020":"SHA-384(Django)", "122020":"SHA-512", "122060":"SHA-512(HMAC)", "122040":"Whirlpool", "122080":"Whirlpool(HMAC)"};

var id={"crc16":"101020","crc16ccitt":"101040","fcs16":"101060","crc32":"102040","adler32":"102020","crc32b":"102060","xor32":"102080","ghash323":"103040","ghash325":"103020","desunix":"104020","md5half":"105060","md5middle":"105040","mysql":"105020","domaincachedcredentials":"106025","haval128":"106160","md2":"106060","md4":"106040","md5":"106020","nltm":"106029","radminv2x":"106027","ripemd128":"106180","snefru128":"106200","tiger128":"106220","lineageiic4":"107080","md5phpbb3":"107040","md5unix":"107060","md5wordpress":"107020","md5apr":"108020","haval160":"109100","mysql5":"109040","mysql160bit":"109060","ripemd160":"109120","sha1":"109020","tiger160":"109080","haval192":"110040","tiger192":"110020","md5passsaltjoomla1":"112020","sha1django":"113020","haval224":"114040","sha224":"114020","sha256":"115020","haval256":"115040","gostr341194":"115060","ripemd256":"115080","snefru256":"115100","md5passsaltjoomla2":"116020","sam":"116040","sha256django":"117020","ripemd320":"118020","sha384":"119020","sha256s":"120020","sha384django":"121020","sha512":"122020","whirlpool":"122040"};

function isLower (str) {
		return str.toLowerCase() == str;
}
function isUpper (str) {
		return str.toUpperCase() == str;
}
function isAlpha (str) {
		return /^[a-zA-Z]+$/.test(str);
}
function isAlnum (str) {
		return /^[a-zA-Z0-9]+$/.test(str);
}
function isDigit (str) {
		return /^[0-9]+$/.test(str);
}

var HashID = {
	crc16: function (hash) {
		return hash.length == 4 && !isAlpha(hash) && isAlnum(hash);
	},
	crc16ccitt: function (hash) {
		return hash.length == 4 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	fcs16: function (hash) {
		return hash.length == 4 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	crc32: function (hash) {
		return hash.length == 8 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	adler32: function (hash) {
		return hash.length == 8 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	crc32b: function (hash) {
		return hash.length == 8 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	xor32: function (hash) {
		return hash.length == 8 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	ghash323: function (hash) {
		return hash.length == 8 && isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	ghash325: function (hash) {
		return hash.length == 8 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	desunix: function (hash) {
		return hash.length == 13 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	md5half: function (hash) {
		return hash.length == 16 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	md5middle: function (hash) {
		return hash.length == 16 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	mysql: function (hash) {
		return hash.length == 16 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	domaincachedcredentials: function (hash) {
		return hash.length == 32 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	haval128: function (hash) {
		return hash.length == 32 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	md2: function (hash) {
		return hash.length == 32 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	md4: function (hash) {
		return hash.length == 32 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	md5: function (hash) {
		return hash.length == 32 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	nltm: function (hash) {
		return hash.length == 32 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	radminv2x: function (hash) {
		return hash.length == 32 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	ripemd128: function (hash) {
		return hash.length == 32 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	snefru128: function (hash) {
		return hash.length == 32 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	tiger128: function (hash) {
		return hash.length == 32 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	lineageiic4: function (hash) {
		return hash.length == 34 && !isDigit(hash) && !isAlpha(hash) && !isAlnum(hash) && hash.substr(0, 2) == "0x";
	},
	md5phpbb3: function (hash) {
		return hash.length == 34 && !isDigit(hash) && !isAlpha(hash) && !isAlnum(hash) && hash.substr(0, 3) == "$H$";
	},
	md5unix: function (hash) {
		return hash.length == 34 && !isDigit(hash) && !isAlpha(hash) && !isAlnum(hash) && hash.substr(0, 3) == "$1$";
	},
	md5wordpress: function (hash) {
		return hash.length == 34 && !isDigit(hash) && !isAlpha(hash) && !isAlnum(hash) && hash.substr(0, 3) == "$P$";
	},
	md5apr: function (hash) {
		return hash.length == 37 && !isDigit(hash) && !isAlpha(hash) && !isAlnum(hash) && hash.substr(0, 3) == "$apr";
	},
	haval160: function (hash) {
		return hash.length == 40 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	mysql5: function (hash) {
		return hash.length == 40 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	msql160bit: function (hash) {
		return hash.length == 41 && !isDigit(hash) && !isAlpha(hash) && !isAlnum(hash) && hash[0] == "*";
	},
	ripemd160: function (hash) {
		return hash.length == 40 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	sha1: function (hash) {
		return hash.length == 40 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	tiger160: function (hash) {
		return hash.length == 40 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	haval192: function (hash) {
		return hash.length == 48 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	tiger192: function (hash) {
		return hash.length == 48 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	md5passsaltjoomla1: function (hash) {
		return hash.length == 48 && !isDigit(hash) && !isAlpha(hash) && !isAlnum(hash) && hash[32] == ":";
	},
	sha1django: function (hash) {
		return hash.length == 48 && !isDigit(hash) && !isAlpha(hash) && !isAlnum(hash) && hash.substr(0, 5) == "sha1$";
	},
	haval224: function (hash) {
		return hash.length == 56 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	sha224: function (hash) {
		return hash.length == 56 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	sha256: function (hash) {
		return hash.length == 64 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	haval256: function (hash) {
		return hash.length == 64 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	gostr341194: function (hash) {
		return hash.length == 64 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	ripemd256: function (hash) {
		return hash.length == 64 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	snefru256: function (hash) {
		return hash.length == 64 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	md5passsaltjoomla2: function (hash) {
		return hash.length == 65 && !isDigit(hash) && !isAlpha(hash) && !isAlnum(hash) && hash[32] == ":";
	},
	sam: function (hash) {
		return hash.length == 65 && !isDigit(hash) && !isAlpha(hash) && !isAlnum(hash) && isUpper(hash) && hash[32] == ":";
	},
	sha256django: function (hash) {
		return hash.length == 78 && !isDigit(hash) && !isAlpha(hash) && !isAlnum(hash) && hash.substr(0, 6) == "sha256";
	},
	ripemd320: function (hash) {
		return hash.length == 80 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	sha384: function (hash) {
		return hash.length == 96 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	sha256s: function (hash) {
		return hash.length == 98 && !isDigit(hash) && !isAlpha(hash) && !isAlnum(hash) && hash.substr(0, 3) == "$6$";
	},
	sha384django: function (hash) {
		return hash.length == 110 && !isDigit(hash) && !isAlpha(hash) && !isAlnum(hash) && hash.substr(0, 6) == "sha384";
	},
	sha512: function (hash) {
		return hash.length == 128 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	},
	whirlpool: function (hash) {
		return hash.length == 128 && !isDigit(hash) && !isAlpha(hash) && isAlnum(hash);
	}
};



function isFunction(functionToCheck) {
	var getType = {};
	return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

$("#hash").on('input', function () {
	
	var possibilities = [];
	var h = $("#hash").val();
	
	for (fn in HashID) {
		if (isFunction(HashID[fn])) {
			if(HashID[fn].call(this, h)) {
				possibilities.push(id[fn]);
			}
		}
	}
	
	possibilities.sort();
	
	$("#list").empty();
	
	if (possibilities.length == 0) {
		$("#list").append("<div class='item'>Nothing here...</div>");
	}
	if (possibilities.length > 0) {
		for (var i = 0; i < possibilities.length; i++) {
			var cur = algorithms[possibilities[i]];
			$("#list").append("<div class='item'>" + cur + "</div>");
		}
	}
	
});


