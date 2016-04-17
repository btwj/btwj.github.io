
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
Module['FS_createPath']('/.git/objects', '0a', true, true);
Module['FS_createPath']('/.git/objects', '17', true, true);
Module['FS_createPath']('/.git/objects', '19', true, true);
Module['FS_createPath']('/.git/objects', '1a', true, true);
Module['FS_createPath']('/.git/objects', '1d', true, true);
Module['FS_createPath']('/.git/objects', '1f', true, true);
Module['FS_createPath']('/.git/objects', '28', true, true);
Module['FS_createPath']('/.git/objects', '2a', true, true);
Module['FS_createPath']('/.git/objects', '2c', true, true);
Module['FS_createPath']('/.git/objects', '2e', true, true);
Module['FS_createPath']('/.git/objects', '35', true, true);
Module['FS_createPath']('/.git/objects', '3c', true, true);
Module['FS_createPath']('/.git/objects', '3e', true, true);
Module['FS_createPath']('/.git/objects', '49', true, true);
Module['FS_createPath']('/.git/objects', '4a', true, true);
Module['FS_createPath']('/.git/objects', '4b', true, true);
Module['FS_createPath']('/.git/objects', '4e', true, true);
Module['FS_createPath']('/.git/objects', '52', true, true);
Module['FS_createPath']('/.git/objects', '54', true, true);
Module['FS_createPath']('/.git/objects', '58', true, true);
Module['FS_createPath']('/.git/objects', '60', true, true);
Module['FS_createPath']('/.git/objects', '69', true, true);
Module['FS_createPath']('/.git/objects', '75', true, true);
Module['FS_createPath']('/.git/objects', '85', true, true);
Module['FS_createPath']('/.git/objects', '89', true, true);
Module['FS_createPath']('/.git/objects', '8d', true, true);
Module['FS_createPath']('/.git/objects', '95', true, true);
Module['FS_createPath']('/.git/objects', 'a0', true, true);
Module['FS_createPath']('/.git/objects', 'a7', true, true);
Module['FS_createPath']('/.git/objects', 'a8', true, true);
Module['FS_createPath']('/.git/objects', 'b0', true, true);
Module['FS_createPath']('/.git/objects', 'b1', true, true);
Module['FS_createPath']('/.git/objects', 'b4', true, true);
Module['FS_createPath']('/.git/objects', 'b8', true, true);
Module['FS_createPath']('/.git/objects', 'c6', true, true);
Module['FS_createPath']('/.git/objects', 'c7', true, true);
Module['FS_createPath']('/.git/objects', 'c9', true, true);
Module['FS_createPath']('/.git/objects', 'd3', true, true);
Module['FS_createPath']('/.git/objects', 'dc', true, true);
Module['FS_createPath']('/.git/objects', 'df', true, true);
Module['FS_createPath']('/.git/objects', 'e4', true, true);
Module['FS_createPath']('/.git/objects', 'e6', true, true);
Module['FS_createPath']('/.git/objects', 'e7', true, true);
Module['FS_createPath']('/.git/objects', 'ed', true, true);
Module['FS_createPath']('/.git/objects', 'fa', true, true);
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
 loadPackage({"files": [{"audio": 0, "start": 0, "crunched": 0, "end": 0, "filename": "/.gitignore"}, {"audio": 0, "start": 0, "crunched": 0, "end": 5327, "filename": "/character.lua"}, {"audio": 0, "start": 5327, "crunched": 0, "end": 5417, "filename": "/conf.lua"}, {"audio": 0, "start": 5417, "crunched": 0, "end": 6510, "filename": "/cutscene.lua"}, {"audio": 0, "start": 6510, "crunched": 0, "end": 15281, "filename": "/level.lua"}, {"audio": 0, "start": 15281, "crunched": 0, "end": 18442, "filename": "/main.lua"}, {"audio": 0, "start": 18442, "crunched": 0, "end": 18701, "filename": "/README.md"}, {"audio": 0, "start": 18701, "crunched": 0, "end": 20800, "filename": "/stage.lua"}, {"audio": 0, "start": 20800, "crunched": 0, "end": 21102, "filename": "/.git/config"}, {"audio": 0, "start": 21102, "crunched": 0, "end": 21175, "filename": "/.git/description"}, {"audio": 0, "start": 21175, "crunched": 0, "end": 21265, "filename": "/.git/FETCH_HEAD"}, {"audio": 0, "start": 21265, "crunched": 0, "end": 21288, "filename": "/.git/HEAD"}, {"audio": 0, "start": 21288, "crunched": 0, "end": 24696, "filename": "/.git/index"}, {"audio": 0, "start": 24696, "crunched": 0, "end": 24737, "filename": "/.git/ORIG_HEAD"}, {"audio": 0, "start": 24737, "crunched": 0, "end": 24844, "filename": "/.git/packed-refs"}, {"audio": 0, "start": 24844, "crunched": 0, "end": 25296, "filename": "/.git/hooks/applypatch-msg.sample"}, {"audio": 0, "start": 25296, "crunched": 0, "end": 26192, "filename": "/.git/hooks/commit-msg.sample"}, {"audio": 0, "start": 26192, "crunched": 0, "end": 26381, "filename": "/.git/hooks/post-update.sample"}, {"audio": 0, "start": 26381, "crunched": 0, "end": 26779, "filename": "/.git/hooks/pre-applypatch.sample"}, {"audio": 0, "start": 26779, "crunched": 0, "end": 28421, "filename": "/.git/hooks/pre-commit.sample"}, {"audio": 0, "start": 28421, "crunched": 0, "end": 29769, "filename": "/.git/hooks/pre-push.sample"}, {"audio": 0, "start": 29769, "crunched": 0, "end": 34720, "filename": "/.git/hooks/pre-rebase.sample"}, {"audio": 0, "start": 34720, "crunched": 0, "end": 35959, "filename": "/.git/hooks/prepare-commit-msg.sample"}, {"audio": 0, "start": 35959, "crunched": 0, "end": 39570, "filename": "/.git/hooks/update.sample"}, {"audio": 0, "start": 39570, "crunched": 0, "end": 39810, "filename": "/.git/info/exclude"}, {"audio": 0, "start": 39810, "crunched": 0, "end": 40139, "filename": "/.git/logs/HEAD"}, {"audio": 0, "start": 40139, "crunched": 0, "end": 40468, "filename": "/.git/logs/refs/heads/master"}, {"audio": 0, "start": 40468, "crunched": 0, "end": 40642, "filename": "/.git/logs/refs/remotes/origin/HEAD"}, {"audio": 0, "start": 40642, "crunched": 0, "end": 40797, "filename": "/.git/logs/refs/remotes/origin/master"}, {"audio": 0, "start": 40797, "crunched": 0, "end": 40888, "filename": "/.git/objects/0a/eccd465eb731e70edaacd23e462bcd0bf5a530"}, {"audio": 0, "start": 40888, "crunched": 0, "end": 44835, "filename": "/.git/objects/17/1078a72d62a1cee64e8f56d463cb4b919dd6ad"}, {"audio": 0, "start": 44835, "crunched": 0, "end": 45640, "filename": "/.git/objects/17/1ad7c45c789174ce813c32da111d62b95f56d0"}, {"audio": 0, "start": 45640, "crunched": 0, "end": 45763, "filename": "/.git/objects/19/ee46a67efa6719fe7c93796aa747d41d7d5d4f"}, {"audio": 0, "start": 45763, "crunched": 0, "end": 46090, "filename": "/.git/objects/1a/52bd06719f7ac3fe77f0295a702650f94ff5f5"}, {"audio": 0, "start": 46090, "crunched": 0, "end": 47303, "filename": "/.git/objects/1d/3e08e286d15687ec4ddd8d22f0fc5b44b26857"}, {"audio": 0, "start": 47303, "crunched": 0, "end": 49526, "filename": "/.git/objects/1d/be584173442a98cc102ad9b2bc96e8b38d054a"}, {"audio": 0, "start": 49526, "crunched": 0, "end": 50131, "filename": "/.git/objects/1f/158184b68a6a57a697e8b4ee072229f6a8b2ca"}, {"audio": 0, "start": 50131, "crunched": 0, "end": 50294, "filename": "/.git/objects/28/75b578851c58a5ed7db06cfb29a2bd57738657"}, {"audio": 0, "start": 50294, "crunched": 0, "end": 50603, "filename": "/.git/objects/2a/70859a0d3992f80312a70e8da2eda10e5afbe4"}, {"audio": 0, "start": 50603, "crunched": 0, "end": 50839, "filename": "/.git/objects/2a/89d6a16e7576f963c0fc14f9b92786d1f8d71b"}, {"audio": 0, "start": 50839, "crunched": 0, "end": 59786, "filename": "/.git/objects/2c/15ba3ec2a3a681c7779077d3699e03340e5fc4"}, {"audio": 0, "start": 59786, "crunched": 0, "end": 62430, "filename": "/.git/objects/2c/7ae018b3c4fa4f88ed259ebca81b9fdbee39a2"}, {"audio": 0, "start": 62430, "crunched": 0, "end": 62976, "filename": "/.git/objects/2e/51dc073ec9112d67f6a9853511377d077a0b92"}, {"audio": 0, "start": 62976, "crunched": 0, "end": 63149, "filename": "/.git/objects/35/2cb141d8fde4279fbf573f8bc082d5bd698296"}, {"audio": 0, "start": 63149, "crunched": 0, "end": 65463, "filename": "/.git/objects/3c/f68750bc6891a173166cddebeb0ff8147eb663"}, {"audio": 0, "start": 65463, "crunched": 0, "end": 65787, "filename": "/.git/objects/3e/ce3af5674948da854e974a3d2ec45beadc0a11"}, {"audio": 0, "start": 65787, "crunched": 0, "end": 66117, "filename": "/.git/objects/49/5006784561074cc990ae96fd1118fd1339dda6"}, {"audio": 0, "start": 66117, "crunched": 0, "end": 66747, "filename": "/.git/objects/4a/143db5ed2acc9cc75b1d99ec90088bff66237a"}, {"audio": 0, "start": 66747, "crunched": 0, "end": 66863, "filename": "/.git/objects/4b/a17b7fd0df9e7d5e05643fcfacec248baab1a1"}, {"audio": 0, "start": 66863, "crunched": 0, "end": 68058, "filename": "/.git/objects/4e/2f002d25ad22e66b673c9c1e028ae5c9a35b4c"}, {"audio": 0, "start": 68058, "crunched": 0, "end": 68699, "filename": "/.git/objects/52/7b5003485c3ae0e7b6a0f5835c368584813b62"}, {"audio": 0, "start": 68699, "crunched": 0, "end": 68915, "filename": "/.git/objects/54/57c843ebff598261b2be02b3218ec6f7154c09"}, {"audio": 0, "start": 68915, "crunched": 0, "end": 79030, "filename": "/.git/objects/58/40171e37402a8dd522c9b2ea1ef65a397979ee"}, {"audio": 0, "start": 79030, "crunched": 0, "end": 79196, "filename": "/.git/objects/60/39943f9186338eb1ed6409257b0109f9627070"}, {"audio": 0, "start": 79196, "crunched": 0, "end": 89804, "filename": "/.git/objects/69/9f2b87589ad13b390e31fd09cd77b80e9c0ad1"}, {"audio": 0, "start": 89804, "crunched": 0, "end": 89969, "filename": "/.git/objects/75/d94c7f150111fe37efed2e6f0deda5c0f81915"}, {"audio": 0, "start": 89969, "crunched": 0, "end": 90497, "filename": "/.git/objects/85/976f6723e90d74b87ffd7037cd49a7772837d4"}, {"audio": 0, "start": 90497, "crunched": 0, "end": 91031, "filename": "/.git/objects/89/434afacedb505dfcc9587bc91984bd26009dfc"}, {"audio": 0, "start": 91031, "crunched": 0, "end": 91544, "filename": "/.git/objects/8d/2c49d931ee58fff01c0ebcbb1867674ddc3666"}, {"audio": 0, "start": 91544, "crunched": 0, "end": 91675, "filename": "/.git/objects/95/b5ed3549d016902783ad717edda98fe020b9ca"}, {"audio": 0, "start": 91675, "crunched": 0, "end": 92120, "filename": "/.git/objects/a0/4427c70a1047cb80cb8bb231bb0e6e9d6cff4e"}, {"audio": 0, "start": 92120, "crunched": 0, "end": 92735, "filename": "/.git/objects/a7/4e855a0e1d70377c46c377d4ee0f30349de442"}, {"audio": 0, "start": 92735, "crunched": 0, "end": 92813, "filename": "/.git/objects/a8/17b884bf722c1ad8ee9b70993b75466ef8980a"}, {"audio": 0, "start": 92813, "crunched": 0, "end": 93388, "filename": "/.git/objects/b0/1894c33a86a9abca65a9e3da03577f01c21461"}, {"audio": 0, "start": 93388, "crunched": 0, "end": 139074, "filename": "/.git/objects/b1/9aa7b9d5a928d08642b76c36b30160389af29c"}, {"audio": 0, "start": 139074, "crunched": 0, "end": 139605, "filename": "/.git/objects/b4/34848cdede0692e6f34992482e123ff4424368"}, {"audio": 0, "start": 139605, "crunched": 0, "end": 139695, "filename": "/.git/objects/b8/dbf5237bf2175f96be2cb54f1faf290691620e"}, {"audio": 0, "start": 139695, "crunched": 0, "end": 140115, "filename": "/.git/objects/c6/bbbc3bab752c04703a30bc939f4210dac433ca"}, {"audio": 0, "start": 140115, "crunched": 0, "end": 140324, "filename": "/.git/objects/c7/b594bd2dd3ddfa2f84e9cf0e0fccb12c844e97"}, {"audio": 0, "start": 140324, "crunched": 0, "end": 140687, "filename": "/.git/objects/c9/974ec046cc14e63e8119b2b4b67208733bfce8"}, {"audio": 0, "start": 140687, "crunched": 0, "end": 141112, "filename": "/.git/objects/d3/b7cc8a5331112d06b0667a45034d003a09d6b0"}, {"audio": 0, "start": 141112, "crunched": 0, "end": 141476, "filename": "/.git/objects/dc/e23b993a893e97edbe7689abd6c9671a9e76e5"}, {"audio": 0, "start": 141476, "crunched": 0, "end": 222029, "filename": "/.git/objects/df/80c85aea0baade82ad55463bf4e5c31a196a4b"}, {"audio": 0, "start": 222029, "crunched": 0, "end": 222528, "filename": "/.git/objects/e4/e0948719f767fa0e7bac9569994471373d2322"}, {"audio": 0, "start": 222528, "crunched": 0, "end": 224440, "filename": "/.git/objects/e4/e45bf2fb60b3943e2af13ba1273d2c362ea998"}, {"audio": 0, "start": 224440, "crunched": 0, "end": 224803, "filename": "/.git/objects/e6/4090c6c18980790d9b43cc5d02b6c2f6f8c88a"}, {"audio": 0, "start": 224803, "crunched": 0, "end": 224818, "filename": "/.git/objects/e6/9de29bb2d1d6434b8b29ae775ad8c2e48c5391"}, {"audio": 0, "start": 224818, "crunched": 0, "end": 227332, "filename": "/.git/objects/e6/e820d347b6a07af71de853a70e237969e5a3c4"}, {"audio": 0, "start": 227332, "crunched": 0, "end": 227840, "filename": "/.git/objects/e7/198ab0391044bc11eac3172c9b34bf26526b73"}, {"audio": 0, "start": 227840, "crunched": 0, "end": 228340, "filename": "/.git/objects/ed/f5268d0d3ec396acfdc3442c65fe939071104c"}, {"audio": 0, "start": 228340, "crunched": 0, "end": 232743, "filename": "/.git/objects/fa/e77ef83769d220da2e1585ef9ed43a751fdd48"}, {"audio": 0, "start": 232743, "crunched": 0, "end": 233062, "filename": "/.git/objects/fe/43b93ec1474b18bb2b203fb9dc11aad62a2a5d"}, {"audio": 0, "start": 233062, "crunched": 0, "end": 233252, "filename": "/.git/objects/ff/7e66a4da09e15cd937d23ae3ccb227b2e17778"}, {"audio": 0, "start": 233252, "crunched": 0, "end": 233293, "filename": "/.git/refs/heads/master"}, {"audio": 0, "start": 233293, "crunched": 0, "end": 233325, "filename": "/.git/refs/remotes/origin/HEAD"}, {"audio": 0, "start": 233325, "crunched": 0, "end": 233366, "filename": "/.git/refs/remotes/origin/master"}, {"audio": 0, "start": 233366, "crunched": 0, "end": 261534, "filename": "/fonts/Munro.ttf"}, {"audio": 0, "start": 261534, "crunched": 0, "end": 289218, "filename": "/fonts/MunroNarrow.ttf"}, {"audio": 0, "start": 289218, "crunched": 0, "end": 316518, "filename": "/fonts/MunroSmall.ttf"}, {"audio": 0, "start": 316518, "crunched": 0, "end": 317026, "filename": "/img/characters/barackobama.png"}, {"audio": 0, "start": 317026, "crunched": 0, "end": 317540, "filename": "/img/characters/billclinton.png"}, {"audio": 0, "start": 317540, "crunched": 0, "end": 318051, "filename": "/img/characters/davidcameron.png"}, {"audio": 0, "start": 318051, "crunched": 0, "end": 318577, "filename": "/img/characters/hillaryclinton.png"}, {"audio": 0, "start": 318577, "crunched": 0, "end": 319065, "filename": "/img/characters/lizardperson.png"}, {"audio": 0, "start": 319065, "crunched": 0, "end": 319675, "filename": "/img/characters/queenelizabeth.png"}, {"audio": 0, "start": 319675, "crunched": 0, "end": 320230, "filename": "/img/characters/queensguard.png"}, {"audio": 0, "start": 320230, "crunched": 0, "end": 320723, "filename": "/img/characters/secretagent.png"}, {"audio": 0, "start": 320723, "crunched": 0, "end": 321203, "filename": "/img/characters/secretagent2.png"}, {"audio": 0, "start": 321203, "crunched": 0, "end": 324482, "filename": "/img/ui/background.png"}, {"audio": 0, "start": 324482, "crunched": 0, "end": 325077, "filename": "/img/ui/btn_capture.png"}, {"audio": 0, "start": 325077, "crunched": 0, "end": 325662, "filename": "/img/ui/btn_capture_hover.png"}, {"audio": 0, "start": 325662, "crunched": 0, "end": 325966, "filename": "/img/ui/btn_place_marker.png"}, {"audio": 0, "start": 325966, "crunched": 0, "end": 326265, "filename": "/img/ui/btn_place_marker_hover.png"}, {"audio": 0, "start": 326265, "crunched": 0, "end": 326670, "filename": "/img/ui/btn_vis.png"}, {"audio": 0, "start": 326670, "crunched": 0, "end": 327070, "filename": "/img/ui/btn_vis_toggle.png"}, {"audio": 0, "start": 327070, "crunched": 0, "end": 327367, "filename": "/img/ui/bubble.png"}, {"audio": 0, "start": 327367, "crunched": 0, "end": 329720, "filename": "/img/ui/gameover.png"}, {"audio": 0, "start": 329720, "crunched": 0, "end": 332004, "filename": "/img/ui/gamewin.png"}, {"audio": 0, "start": 332004, "crunched": 0, "end": 332115, "filename": "/img/ui/marker_0.png"}, {"audio": 0, "start": 332115, "crunched": 0, "end": 332308, "filename": "/img/ui/marker_1.png"}, {"audio": 0, "start": 332308, "crunched": 0, "end": 332482, "filename": "/img/ui/marker_2.png"}, {"audio": 0, "start": 332482, "crunched": 0, "end": 332701, "filename": "/img/ui/particle.png"}, {"audio": 1, "start": 332701, "crunched": 0, "end": 343251, "filename": "/sounds/beep.wav"}, {"audio": 1, "start": 343251, "crunched": 0, "end": 353801, "filename": "/sounds/beep2.wav"}, {"audio": 1, "start": 353801, "crunched": 0, "end": 366537, "filename": "/sounds/hit.wav"}, {"audio": 1, "start": 366537, "crunched": 0, "end": 422881, "filename": "/sounds/switch.wav"}, {"audio": 1, "start": 422881, "crunched": 0, "end": 541579, "filename": "/sounds/transform.wav"}], "remote_package_size": 541579, "package_uuid": "0f2a465b-9b27-4b07-86ea-6b79ed095322"});

})();
