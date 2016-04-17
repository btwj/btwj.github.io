
var Module;

if (typeof Module === 'undefined') Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');

if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {
 var loadPackage = function(metadata) {

    var PACKAGE_PATH;
    if (typeof window === 'object') {
      PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
    } else if (typeof location !== 'undefined') {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      throw 'using preloaded data can only be done on a web page or in a web worker';
    }
    var PACKAGE_NAME = 'game.data';
    var REMOTE_PACKAGE_BASE = 'game.data';
    if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
      Module['locateFile'] = Module['locateFilePackage'];
      Module.printErr('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
    }
    var REMOTE_PACKAGE_NAME = typeof Module['locateFile'] === 'function' ?
                              Module['locateFile'](REMOTE_PACKAGE_BASE) :
                              ((Module['filePackagePrefixURL'] || '') + REMOTE_PACKAGE_BASE);
  
    var REMOTE_PACKAGE_SIZE = metadata.remote_package_size;
    var PACKAGE_UUID = metadata.package_uuid;
  
    function fetchRemotePackage(packageName, packageSize, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        var size = packageSize;
        if (event.total) size = event.total;
        if (event.loaded) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: size
            };
          } else {
            Module.dataFileDownloads[url].loaded = event.loaded;
          }
          var total = 0;
          var loaded = 0;
          var num = 0;
          for (var download in Module.dataFileDownloads) {
          var data = Module.dataFileDownloads[download];
            total += data.total;
            loaded += data.loaded;
            num++;
          }
          total = Math.ceil(total * Module.expectedDataFileDownloads/num);
          if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Downloading data...');
        }
      };
      xhr.onload = function(event) {
        var packageData = xhr.response;
        callback(packageData);
      };
      xhr.send(null);
    };

    function handleError(error) {
      console.error('package error:', error);
    };
  
      var fetched = null, fetchedCallback = null;
      fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);
    
  function runWithFS() {

    function assert(check, msg) {
      if (!check) throw msg + new Error().stack;
    }
Module['FS_createPath']('/', '.git', true, true);
Module['FS_createPath']('/.git', 'hooks', true, true);
Module['FS_createPath']('/.git', 'info', true, true);
Module['FS_createPath']('/.git', 'logs', true, true);
Module['FS_createPath']('/.git/logs', 'refs', true, true);
Module['FS_createPath']('/.git/logs/refs', 'heads', true, true);
Module['FS_createPath']('/.git/logs/refs', 'remotes', true, true);
Module['FS_createPath']('/.git/logs/refs/remotes', 'origin', true, true);
Module['FS_createPath']('/.git', 'objects', true, true);
Module['FS_createPath']('/.git/objects', '01', true, true);
Module['FS_createPath']('/.git/objects', '0a', true, true);
Module['FS_createPath']('/.git/objects', '17', true, true);
Module['FS_createPath']('/.git/objects', '19', true, true);
Module['FS_createPath']('/.git/objects', '1a', true, true);
Module['FS_createPath']('/.git/objects', '1d', true, true);
Module['FS_createPath']('/.git/objects', '1f', true, true);
Module['FS_createPath']('/.git/objects', '28', true, true);
Module['FS_createPath']('/.git/objects', '2a', true, true);
Module['FS_createPath']('/.git/objects', '2b', true, true);
Module['FS_createPath']('/.git/objects', '2c', true, true);
Module['FS_createPath']('/.git/objects', '2e', true, true);
Module['FS_createPath']('/.git/objects', '35', true, true);
Module['FS_createPath']('/.git/objects', '39', true, true);
Module['FS_createPath']('/.git/objects', '3c', true, true);
Module['FS_createPath']('/.git/objects', '3e', true, true);
Module['FS_createPath']('/.git/objects', '49', true, true);
Module['FS_createPath']('/.git/objects', '4a', true, true);
Module['FS_createPath']('/.git/objects', '4b', true, true);
Module['FS_createPath']('/.git/objects', '4e', true, true);
Module['FS_createPath']('/.git/objects', '50', true, true);
Module['FS_createPath']('/.git/objects', '52', true, true);
Module['FS_createPath']('/.git/objects', '54', true, true);
Module['FS_createPath']('/.git/objects', '56', true, true);
Module['FS_createPath']('/.git/objects', '58', true, true);
Module['FS_createPath']('/.git/objects', '60', true, true);
Module['FS_createPath']('/.git/objects', '66', true, true);
Module['FS_createPath']('/.git/objects', '69', true, true);
Module['FS_createPath']('/.git/objects', '75', true, true);
Module['FS_createPath']('/.git/objects', '76', true, true);
Module['FS_createPath']('/.git/objects', '85', true, true);
Module['FS_createPath']('/.git/objects', '89', true, true);
Module['FS_createPath']('/.git/objects', '8d', true, true);
Module['FS_createPath']('/.git/objects', '8f', true, true);
Module['FS_createPath']('/.git/objects', '95', true, true);
Module['FS_createPath']('/.git/objects', 'a0', true, true);
Module['FS_createPath']('/.git/objects', 'a3', true, true);
Module['FS_createPath']('/.git/objects', 'a7', true, true);
Module['FS_createPath']('/.git/objects', 'a8', true, true);
Module['FS_createPath']('/.git/objects', 'b0', true, true);
Module['FS_createPath']('/.git/objects', 'b1', true, true);
Module['FS_createPath']('/.git/objects', 'b4', true, true);
Module['FS_createPath']('/.git/objects', 'b8', true, true);
Module['FS_createPath']('/.git/objects', 'c6', true, true);
Module['FS_createPath']('/.git/objects', 'c7', true, true);
Module['FS_createPath']('/.git/objects', 'c8', true, true);
Module['FS_createPath']('/.git/objects', 'c9', true, true);
Module['FS_createPath']('/.git/objects', 'd3', true, true);
Module['FS_createPath']('/.git/objects', 'db', true, true);
Module['FS_createPath']('/.git/objects', 'dc', true, true);
Module['FS_createPath']('/.git/objects', 'df', true, true);
Module['FS_createPath']('/.git/objects', 'e4', true, true);
Module['FS_createPath']('/.git/objects', 'e6', true, true);
Module['FS_createPath']('/.git/objects', 'e7', true, true);
Module['FS_createPath']('/.git/objects', 'ed', true, true);
Module['FS_createPath']('/.git/objects', 'f7', true, true);
Module['FS_createPath']('/.git/objects', 'f9', true, true);
Module['FS_createPath']('/.git/objects', 'fa', true, true);
Module['FS_createPath']('/.git/objects', 'fb', true, true);
Module['FS_createPath']('/.git/objects', 'fe', true, true);
Module['FS_createPath']('/.git/objects', 'ff', true, true);
Module['FS_createPath']('/.git', 'refs', true, true);
Module['FS_createPath']('/.git/refs', 'heads', true, true);
Module['FS_createPath']('/.git/refs', 'remotes', true, true);
Module['FS_createPath']('/.git/refs/remotes', 'origin', true, true);
Module['FS_createPath']('/', 'fonts', true, true);
Module['FS_createPath']('/', 'img', true, true);
Module['FS_createPath']('/img', 'characters', true, true);
Module['FS_createPath']('/img', 'ui', true, true);
Module['FS_createPath']('/', 'sounds', true, true);

    function DataRequest(start, end, crunched, audio) {
      this.start = start;
      this.end = end;
      this.crunched = crunched;
      this.audio = audio;
    }
    DataRequest.prototype = {
      requests: {},
      open: function(mode, name) {
        this.name = name;
        this.requests[name] = this;
        Module['addRunDependency']('fp ' + this.name);
      },
      send: function() {},
      onload: function() {
        var byteArray = this.byteArray.subarray(this.start, this.end);

          this.finish(byteArray);

      },
      finish: function(byteArray) {
        var that = this;

        Module['FS_createDataFile'](this.name, null, byteArray, true, true, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
        Module['removeRunDependency']('fp ' + that.name);

        this.requests[this.name] = null;
      },
    };

        var files = metadata.files;
        for (i = 0; i < files.length; ++i) {
          new DataRequest(files[i].start, files[i].end, files[i].crunched, files[i].audio).open('GET', files[i].filename);
        }

  
    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;
      
        // copy the entire loaded file into a spot in the heap. Files will refer to slices in that. They cannot be freed though
        // (we may be allocating before malloc is ready, during startup).
        if (Module['SPLIT_MEMORY']) Module.printErr('warning: you should run the file packager with --no-heap-copy when SPLIT_MEMORY is used, otherwise copying into the heap may fail due to the splitting');
        var ptr = Module['getMemory'](byteArray.length);
        Module['HEAPU8'].set(byteArray, ptr);
        DataRequest.prototype.byteArray = Module['HEAPU8'].subarray(ptr, ptr+byteArray.length);
  
          var files = metadata.files;
          for (i = 0; i < files.length; ++i) {
            DataRequest.prototype.requests[files[i].filename].onload();
          }
              Module['removeRunDependency']('datafile_game.data');

    };
    Module['addRunDependency']('datafile_game.data');
  
    if (!Module.preloadResults) Module.preloadResults = {};
  
      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }
    
  }
  if (Module['calledRun']) {
    runWithFS();
  } else {
    if (!Module['preRun']) Module['preRun'] = [];
    Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
  }

 }
 loadPackage({"files": [{"audio": 0, "start": 0, "crunched": 0, "end": 0, "filename": "/.gitignore"}, {"audio": 0, "start": 0, "crunched": 0, "end": 4082, "filename": "/character.lua"}, {"audio": 0, "start": 4082, "crunched": 0, "end": 4207, "filename": "/conf.lua"}, {"audio": 0, "start": 4207, "crunched": 0, "end": 6635, "filename": "/const.lua"}, {"audio": 0, "start": 6635, "crunched": 0, "end": 7728, "filename": "/cutscene.lua"}, {"audio": 0, "start": 7728, "crunched": 0, "end": 15643, "filename": "/level.lua"}, {"audio": 0, "start": 15643, "crunched": 0, "end": 18986, "filename": "/main.lua"}, {"audio": 0, "start": 18986, "crunched": 0, "end": 19245, "filename": "/README.md"}, {"audio": 0, "start": 19245, "crunched": 0, "end": 21342, "filename": "/stage.lua"}, {"audio": 0, "start": 21342, "crunched": 0, "end": 21354, "filename": "/.git/COMMIT_EDITMSG"}, {"audio": 0, "start": 21354, "crunched": 0, "end": 21656, "filename": "/.git/config"}, {"audio": 0, "start": 21656, "crunched": 0, "end": 21729, "filename": "/.git/description"}, {"audio": 0, "start": 21729, "crunched": 0, "end": 21819, "filename": "/.git/FETCH_HEAD"}, {"audio": 0, "start": 21819, "crunched": 0, "end": 21842, "filename": "/.git/HEAD"}, {"audio": 0, "start": 21842, "crunched": 0, "end": 25322, "filename": "/.git/index"}, {"audio": 0, "start": 25322, "crunched": 0, "end": 25363, "filename": "/.git/ORIG_HEAD"}, {"audio": 0, "start": 25363, "crunched": 0, "end": 25470, "filename": "/.git/packed-refs"}, {"audio": 0, "start": 25470, "crunched": 0, "end": 25922, "filename": "/.git/hooks/applypatch-msg.sample"}, {"audio": 0, "start": 25922, "crunched": 0, "end": 26818, "filename": "/.git/hooks/commit-msg.sample"}, {"audio": 0, "start": 26818, "crunched": 0, "end": 27007, "filename": "/.git/hooks/post-update.sample"}, {"audio": 0, "start": 27007, "crunched": 0, "end": 27405, "filename": "/.git/hooks/pre-applypatch.sample"}, {"audio": 0, "start": 27405, "crunched": 0, "end": 29047, "filename": "/.git/hooks/pre-commit.sample"}, {"audio": 0, "start": 29047, "crunched": 0, "end": 30395, "filename": "/.git/hooks/pre-push.sample"}, {"audio": 0, "start": 30395, "crunched": 0, "end": 35346, "filename": "/.git/hooks/pre-rebase.sample"}, {"audio": 0, "start": 35346, "crunched": 0, "end": 36585, "filename": "/.git/hooks/prepare-commit-msg.sample"}, {"audio": 0, "start": 36585, "crunched": 0, "end": 40196, "filename": "/.git/hooks/update.sample"}, {"audio": 0, "start": 40196, "crunched": 0, "end": 40436, "filename": "/.git/info/exclude"}, {"audio": 0, "start": 40436, "crunched": 0, "end": 41230, "filename": "/.git/logs/HEAD"}, {"audio": 0, "start": 41230, "crunched": 0, "end": 42024, "filename": "/.git/logs/refs/heads/master"}, {"audio": 0, "start": 42024, "crunched": 0, "end": 42198, "filename": "/.git/logs/refs/remotes/origin/HEAD"}, {"audio": 0, "start": 42198, "crunched": 0, "end": 42818, "filename": "/.git/logs/refs/remotes/origin/master"}, {"audio": 0, "start": 42818, "crunched": 0, "end": 43210, "filename": "/.git/objects/01/c66422c2c3faab4f634042b16fd8853a474a72"}, {"audio": 0, "start": 43210, "crunched": 0, "end": 43602, "filename": "/.git/objects/0a/5f43ae5856fda3ed7ccb95d003ba505dd3f8d4"}, {"audio": 0, "start": 43602, "crunched": 0, "end": 43693, "filename": "/.git/objects/0a/eccd465eb731e70edaacd23e462bcd0bf5a530"}, {"audio": 0, "start": 43693, "crunched": 0, "end": 47640, "filename": "/.git/objects/17/1078a72d62a1cee64e8f56d463cb4b919dd6ad"}, {"audio": 0, "start": 47640, "crunched": 0, "end": 48445, "filename": "/.git/objects/17/1ad7c45c789174ce813c32da111d62b95f56d0"}, {"audio": 0, "start": 48445, "crunched": 0, "end": 48568, "filename": "/.git/objects/19/ee46a67efa6719fe7c93796aa747d41d7d5d4f"}, {"audio": 0, "start": 48568, "crunched": 0, "end": 48895, "filename": "/.git/objects/1a/52bd06719f7ac3fe77f0295a702650f94ff5f5"}, {"audio": 0, "start": 48895, "crunched": 0, "end": 50108, "filename": "/.git/objects/1d/3e08e286d15687ec4ddd8d22f0fc5b44b26857"}, {"audio": 0, "start": 50108, "crunched": 0, "end": 52331, "filename": "/.git/objects/1d/be584173442a98cc102ad9b2bc96e8b38d054a"}, {"audio": 0, "start": 52331, "crunched": 0, "end": 52936, "filename": "/.git/objects/1f/158184b68a6a57a697e8b4ee072229f6a8b2ca"}, {"audio": 0, "start": 52936, "crunched": 0, "end": 53099, "filename": "/.git/objects/28/75b578851c58a5ed7db06cfb29a2bd57738657"}, {"audio": 0, "start": 53099, "crunched": 0, "end": 53408, "filename": "/.git/objects/2a/70859a0d3992f80312a70e8da2eda10e5afbe4"}, {"audio": 0, "start": 53408, "crunched": 0, "end": 53644, "filename": "/.git/objects/2a/89d6a16e7576f963c0fc14f9b92786d1f8d71b"}, {"audio": 0, "start": 53644, "crunched": 0, "end": 53761, "filename": "/.git/objects/2b/351faf8ef721a793d3d630224e76a391ceeab8"}, {"audio": 0, "start": 53761, "crunched": 0, "end": 62708, "filename": "/.git/objects/2c/15ba3ec2a3a681c7779077d3699e03340e5fc4"}, {"audio": 0, "start": 62708, "crunched": 0, "end": 65352, "filename": "/.git/objects/2c/7ae018b3c4fa4f88ed259ebca81b9fdbee39a2"}, {"audio": 0, "start": 65352, "crunched": 0, "end": 65898, "filename": "/.git/objects/2e/51dc073ec9112d67f6a9853511377d077a0b92"}, {"audio": 0, "start": 65898, "crunched": 0, "end": 66071, "filename": "/.git/objects/35/2cb141d8fde4279fbf573f8bc082d5bd698296"}, {"audio": 0, "start": 66071, "crunched": 0, "end": 67441, "filename": "/.git/objects/39/7f7d0cba2817ee469b37960bbc47ac74007498"}, {"audio": 0, "start": 67441, "crunched": 0, "end": 69755, "filename": "/.git/objects/3c/f68750bc6891a173166cddebeb0ff8147eb663"}, {"audio": 0, "start": 69755, "crunched": 0, "end": 70079, "filename": "/.git/objects/3e/ce3af5674948da854e974a3d2ec45beadc0a11"}, {"audio": 0, "start": 70079, "crunched": 0, "end": 70409, "filename": "/.git/objects/49/5006784561074cc990ae96fd1118fd1339dda6"}, {"audio": 0, "start": 70409, "crunched": 0, "end": 71039, "filename": "/.git/objects/4a/143db5ed2acc9cc75b1d99ec90088bff66237a"}, {"audio": 0, "start": 71039, "crunched": 0, "end": 73388, "filename": "/.git/objects/4b/4f7a4a7e26ec442c85e2ad2de1abecc22ab83e"}, {"audio": 0, "start": 73388, "crunched": 0, "end": 73504, "filename": "/.git/objects/4b/a17b7fd0df9e7d5e05643fcfacec248baab1a1"}, {"audio": 0, "start": 73504, "crunched": 0, "end": 74699, "filename": "/.git/objects/4e/2f002d25ad22e66b673c9c1e028ae5c9a35b4c"}, {"audio": 0, "start": 74699, "crunched": 0, "end": 75063, "filename": "/.git/objects/50/8ee9a25463b4792f066653402f1c42c85f8e09"}, {"audio": 0, "start": 75063, "crunched": 0, "end": 75704, "filename": "/.git/objects/52/7b5003485c3ae0e7b6a0f5835c368584813b62"}, {"audio": 0, "start": 75704, "crunched": 0, "end": 75920, "filename": "/.git/objects/54/57c843ebff598261b2be02b3218ec6f7154c09"}, {"audio": 0, "start": 75920, "crunched": 0, "end": 76076, "filename": "/.git/objects/56/e4f5b518119510f3c1475c2f8e9b8987899e55"}, {"audio": 0, "start": 76076, "crunched": 0, "end": 86191, "filename": "/.git/objects/58/40171e37402a8dd522c9b2ea1ef65a397979ee"}, {"audio": 0, "start": 86191, "crunched": 0, "end": 86357, "filename": "/.git/objects/60/39943f9186338eb1ed6409257b0109f9627070"}, {"audio": 0, "start": 86357, "crunched": 0, "end": 87338, "filename": "/.git/objects/66/a59e4601dd4e89b0cd4f1c9228e85e269bbc1f"}, {"audio": 0, "start": 87338, "crunched": 0, "end": 97946, "filename": "/.git/objects/69/9f2b87589ad13b390e31fd09cd77b80e9c0ad1"}, {"audio": 0, "start": 97946, "crunched": 0, "end": 98111, "filename": "/.git/objects/75/d94c7f150111fe37efed2e6f0deda5c0f81915"}, {"audio": 0, "start": 98111, "crunched": 0, "end": 99330, "filename": "/.git/objects/76/490c5ee5ea533ad0471cdabcfbca41e7cb3396"}, {"audio": 0, "start": 99330, "crunched": 0, "end": 99858, "filename": "/.git/objects/85/976f6723e90d74b87ffd7037cd49a7772837d4"}, {"audio": 0, "start": 99858, "crunched": 0, "end": 100392, "filename": "/.git/objects/89/434afacedb505dfcc9587bc91984bd26009dfc"}, {"audio": 0, "start": 100392, "crunched": 0, "end": 100905, "filename": "/.git/objects/8d/2c49d931ee58fff01c0ebcbb1867674ddc3666"}, {"audio": 0, "start": 100905, "crunched": 0, "end": 102290, "filename": "/.git/objects/8f/e89e85682a45b24aa418c9b1ae0a4beab65f19"}, {"audio": 0, "start": 102290, "crunched": 0, "end": 102421, "filename": "/.git/objects/95/b5ed3549d016902783ad717edda98fe020b9ca"}, {"audio": 0, "start": 102421, "crunched": 0, "end": 102866, "filename": "/.git/objects/a0/4427c70a1047cb80cb8bb231bb0e6e9d6cff4e"}, {"audio": 0, "start": 102866, "crunched": 0, "end": 104146, "filename": "/.git/objects/a3/54c9943309635d75c5995879d71406b1a717f4"}, {"audio": 0, "start": 104146, "crunched": 0, "end": 104761, "filename": "/.git/objects/a7/4e855a0e1d70377c46c377d4ee0f30349de442"}, {"audio": 0, "start": 104761, "crunched": 0, "end": 104839, "filename": "/.git/objects/a8/17b884bf722c1ad8ee9b70993b75466ef8980a"}, {"audio": 0, "start": 104839, "crunched": 0, "end": 105414, "filename": "/.git/objects/b0/1894c33a86a9abca65a9e3da03577f01c21461"}, {"audio": 0, "start": 105414, "crunched": 0, "end": 151100, "filename": "/.git/objects/b1/9aa7b9d5a928d08642b76c36b30160389af29c"}, {"audio": 0, "start": 151100, "crunched": 0, "end": 151631, "filename": "/.git/objects/b4/34848cdede0692e6f34992482e123ff4424368"}, {"audio": 0, "start": 151631, "crunched": 0, "end": 151721, "filename": "/.git/objects/b8/dbf5237bf2175f96be2cb54f1faf290691620e"}, {"audio": 0, "start": 151721, "crunched": 0, "end": 152141, "filename": "/.git/objects/c6/bbbc3bab752c04703a30bc939f4210dac433ca"}, {"audio": 0, "start": 152141, "crunched": 0, "end": 152350, "filename": "/.git/objects/c7/b594bd2dd3ddfa2f84e9cf0e0fccb12c844e97"}, {"audio": 0, "start": 152350, "crunched": 0, "end": 154866, "filename": "/.git/objects/c8/1a43cdf1a77a4c431d11b8c9d468d498b6ceb7"}, {"audio": 0, "start": 154866, "crunched": 0, "end": 155229, "filename": "/.git/objects/c9/974ec046cc14e63e8119b2b4b67208733bfce8"}, {"audio": 0, "start": 155229, "crunched": 0, "end": 155654, "filename": "/.git/objects/d3/b7cc8a5331112d06b0667a45034d003a09d6b0"}, {"audio": 0, "start": 155654, "crunched": 0, "end": 157997, "filename": "/.git/objects/db/0a58af514a199d75f6fc992e054f523f6d3e45"}, {"audio": 0, "start": 157997, "crunched": 0, "end": 158361, "filename": "/.git/objects/dc/e23b993a893e97edbe7689abd6c9671a9e76e5"}, {"audio": 0, "start": 158361, "crunched": 0, "end": 238914, "filename": "/.git/objects/df/80c85aea0baade82ad55463bf4e5c31a196a4b"}, {"audio": 0, "start": 238914, "crunched": 0, "end": 239413, "filename": "/.git/objects/e4/e0948719f767fa0e7bac9569994471373d2322"}, {"audio": 0, "start": 239413, "crunched": 0, "end": 241325, "filename": "/.git/objects/e4/e45bf2fb60b3943e2af13ba1273d2c362ea998"}, {"audio": 0, "start": 241325, "crunched": 0, "end": 241688, "filename": "/.git/objects/e6/4090c6c18980790d9b43cc5d02b6c2f6f8c88a"}, {"audio": 0, "start": 241688, "crunched": 0, "end": 241703, "filename": "/.git/objects/e6/9de29bb2d1d6434b8b29ae775ad8c2e48c5391"}, {"audio": 0, "start": 241703, "crunched": 0, "end": 244217, "filename": "/.git/objects/e6/e820d347b6a07af71de853a70e237969e5a3c4"}, {"audio": 0, "start": 244217, "crunched": 0, "end": 244725, "filename": "/.git/objects/e7/198ab0391044bc11eac3172c9b34bf26526b73"}, {"audio": 0, "start": 244725, "crunched": 0, "end": 245225, "filename": "/.git/objects/ed/f5268d0d3ec396acfdc3442c65fe939071104c"}, {"audio": 0, "start": 245225, "crunched": 0, "end": 245385, "filename": "/.git/objects/f7/a00a25f9ed678b42d9699fcc872f8bd9f91c6a"}, {"audio": 0, "start": 245385, "crunched": 0, "end": 246180, "filename": "/.git/objects/f9/9ef27e2bc73161e841ab511993b0bc0406e7ba"}, {"audio": 0, "start": 246180, "crunched": 0, "end": 250583, "filename": "/.git/objects/fa/e77ef83769d220da2e1585ef9ed43a751fdd48"}, {"audio": 0, "start": 250583, "crunched": 0, "end": 250744, "filename": "/.git/objects/fb/26a202b1ba57b9b6c6b7da9a126fc9795fc6df"}, {"audio": 0, "start": 250744, "crunched": 0, "end": 251063, "filename": "/.git/objects/fe/43b93ec1474b18bb2b203fb9dc11aad62a2a5d"}, {"audio": 0, "start": 251063, "crunched": 0, "end": 251253, "filename": "/.git/objects/ff/7e66a4da09e15cd937d23ae3ccb227b2e17778"}, {"audio": 0, "start": 251253, "crunched": 0, "end": 251294, "filename": "/.git/refs/heads/master"}, {"audio": 0, "start": 251294, "crunched": 0, "end": 251326, "filename": "/.git/refs/remotes/origin/HEAD"}, {"audio": 0, "start": 251326, "crunched": 0, "end": 251367, "filename": "/.git/refs/remotes/origin/master"}, {"audio": 0, "start": 251367, "crunched": 0, "end": 279535, "filename": "/fonts/Munro.ttf"}, {"audio": 0, "start": 279535, "crunched": 0, "end": 307219, "filename": "/fonts/MunroNarrow.ttf"}, {"audio": 0, "start": 307219, "crunched": 0, "end": 334519, "filename": "/fonts/MunroSmall.ttf"}, {"audio": 0, "start": 334519, "crunched": 0, "end": 335027, "filename": "/img/characters/barackobama.png"}, {"audio": 0, "start": 335027, "crunched": 0, "end": 335541, "filename": "/img/characters/billclinton.png"}, {"audio": 0, "start": 335541, "crunched": 0, "end": 336052, "filename": "/img/characters/davidcameron.png"}, {"audio": 0, "start": 336052, "crunched": 0, "end": 336578, "filename": "/img/characters/hillaryclinton.png"}, {"audio": 0, "start": 336578, "crunched": 0, "end": 337066, "filename": "/img/characters/lizardperson.png"}, {"audio": 0, "start": 337066, "crunched": 0, "end": 337676, "filename": "/img/characters/queenelizabeth.png"}, {"audio": 0, "start": 337676, "crunched": 0, "end": 338231, "filename": "/img/characters/queensguard.png"}, {"audio": 0, "start": 338231, "crunched": 0, "end": 338724, "filename": "/img/characters/secretagent.png"}, {"audio": 0, "start": 338724, "crunched": 0, "end": 339204, "filename": "/img/characters/secretagent2.png"}, {"audio": 0, "start": 339204, "crunched": 0, "end": 342483, "filename": "/img/ui/background.png"}, {"audio": 0, "start": 342483, "crunched": 0, "end": 343078, "filename": "/img/ui/btn_capture.png"}, {"audio": 0, "start": 343078, "crunched": 0, "end": 343663, "filename": "/img/ui/btn_capture_hover.png"}, {"audio": 0, "start": 343663, "crunched": 0, "end": 343967, "filename": "/img/ui/btn_place_marker.png"}, {"audio": 0, "start": 343967, "crunched": 0, "end": 344266, "filename": "/img/ui/btn_place_marker_hover.png"}, {"audio": 0, "start": 344266, "crunched": 0, "end": 344671, "filename": "/img/ui/btn_vis.png"}, {"audio": 0, "start": 344671, "crunched": 0, "end": 345071, "filename": "/img/ui/btn_vis_toggle.png"}, {"audio": 0, "start": 345071, "crunched": 0, "end": 345368, "filename": "/img/ui/bubble.png"}, {"audio": 0, "start": 345368, "crunched": 0, "end": 347721, "filename": "/img/ui/gameover.png"}, {"audio": 0, "start": 347721, "crunched": 0, "end": 350005, "filename": "/img/ui/gamewin.png"}, {"audio": 0, "start": 350005, "crunched": 0, "end": 350116, "filename": "/img/ui/marker_0.png"}, {"audio": 0, "start": 350116, "crunched": 0, "end": 350309, "filename": "/img/ui/marker_1.png"}, {"audio": 0, "start": 350309, "crunched": 0, "end": 350483, "filename": "/img/ui/marker_2.png"}, {"audio": 0, "start": 350483, "crunched": 0, "end": 350702, "filename": "/img/ui/particle.png"}, {"audio": 1, "start": 350702, "crunched": 0, "end": 361252, "filename": "/sounds/beep.wav"}, {"audio": 1, "start": 361252, "crunched": 0, "end": 371802, "filename": "/sounds/beep2.wav"}, {"audio": 1, "start": 371802, "crunched": 0, "end": 384538, "filename": "/sounds/hit.wav"}, {"audio": 1, "start": 384538, "crunched": 0, "end": 440882, "filename": "/sounds/switch.wav"}, {"audio": 1, "start": 440882, "crunched": 0, "end": 559580, "filename": "/sounds/transform.wav"}], "remote_package_size": 559580, "package_uuid": "24201d2b-c35e-405d-b53d-4ec0e9ca6642"});

})();
