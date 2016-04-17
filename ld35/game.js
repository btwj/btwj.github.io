
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
Module['FS_createPath']('/.git/objects', '2b', true, true);
Module['FS_createPath']('/.git/objects', '2c', true, true);
Module['FS_createPath']('/.git/objects', '2e', true, true);
Module['FS_createPath']('/.git/objects', '35', true, true);
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
Module['FS_createPath']('/.git/objects', 'dc', true, true);
Module['FS_createPath']('/.git/objects', 'df', true, true);
Module['FS_createPath']('/.git/objects', 'e4', true, true);
Module['FS_createPath']('/.git/objects', 'e6', true, true);
Module['FS_createPath']('/.git/objects', 'e7', true, true);
Module['FS_createPath']('/.git/objects', 'ed', true, true);
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
 loadPackage({"files": [{"audio": 0, "start": 0, "crunched": 0, "end": 0, "filename": "/.gitignore"}, {"audio": 0, "start": 0, "crunched": 0, "end": 4153, "filename": "/character.lua"}, {"audio": 0, "start": 4153, "crunched": 0, "end": 4278, "filename": "/conf.lua"}, {"audio": 0, "start": 4278, "crunched": 0, "end": 6706, "filename": "/const.lua"}, {"audio": 0, "start": 6706, "crunched": 0, "end": 7799, "filename": "/cutscene.lua"}, {"audio": 0, "start": 7799, "crunched": 0, "end": 15758, "filename": "/level.lua"}, {"audio": 0, "start": 15758, "crunched": 0, "end": 19101, "filename": "/main.lua"}, {"audio": 0, "start": 19101, "crunched": 0, "end": 19360, "filename": "/README.md"}, {"audio": 0, "start": 19360, "crunched": 0, "end": 21459, "filename": "/stage.lua"}, {"audio": 0, "start": 21459, "crunched": 0, "end": 21761, "filename": "/.git/config"}, {"audio": 0, "start": 21761, "crunched": 0, "end": 21834, "filename": "/.git/description"}, {"audio": 0, "start": 21834, "crunched": 0, "end": 21924, "filename": "/.git/FETCH_HEAD"}, {"audio": 0, "start": 21924, "crunched": 0, "end": 21947, "filename": "/.git/HEAD"}, {"audio": 0, "start": 21947, "crunched": 0, "end": 25427, "filename": "/.git/index"}, {"audio": 0, "start": 25427, "crunched": 0, "end": 25468, "filename": "/.git/ORIG_HEAD"}, {"audio": 0, "start": 25468, "crunched": 0, "end": 25575, "filename": "/.git/packed-refs"}, {"audio": 0, "start": 25575, "crunched": 0, "end": 26027, "filename": "/.git/hooks/applypatch-msg.sample"}, {"audio": 0, "start": 26027, "crunched": 0, "end": 26923, "filename": "/.git/hooks/commit-msg.sample"}, {"audio": 0, "start": 26923, "crunched": 0, "end": 27112, "filename": "/.git/hooks/post-update.sample"}, {"audio": 0, "start": 27112, "crunched": 0, "end": 27510, "filename": "/.git/hooks/pre-applypatch.sample"}, {"audio": 0, "start": 27510, "crunched": 0, "end": 29152, "filename": "/.git/hooks/pre-commit.sample"}, {"audio": 0, "start": 29152, "crunched": 0, "end": 30500, "filename": "/.git/hooks/pre-push.sample"}, {"audio": 0, "start": 30500, "crunched": 0, "end": 35451, "filename": "/.git/hooks/pre-rebase.sample"}, {"audio": 0, "start": 35451, "crunched": 0, "end": 36690, "filename": "/.git/hooks/prepare-commit-msg.sample"}, {"audio": 0, "start": 36690, "crunched": 0, "end": 40301, "filename": "/.git/hooks/update.sample"}, {"audio": 0, "start": 40301, "crunched": 0, "end": 40541, "filename": "/.git/info/exclude"}, {"audio": 0, "start": 40541, "crunched": 0, "end": 41180, "filename": "/.git/logs/HEAD"}, {"audio": 0, "start": 41180, "crunched": 0, "end": 41819, "filename": "/.git/logs/refs/heads/master"}, {"audio": 0, "start": 41819, "crunched": 0, "end": 41993, "filename": "/.git/logs/refs/remotes/origin/HEAD"}, {"audio": 0, "start": 41993, "crunched": 0, "end": 42458, "filename": "/.git/logs/refs/remotes/origin/master"}, {"audio": 0, "start": 42458, "crunched": 0, "end": 42850, "filename": "/.git/objects/0a/5f43ae5856fda3ed7ccb95d003ba505dd3f8d4"}, {"audio": 0, "start": 42850, "crunched": 0, "end": 42941, "filename": "/.git/objects/0a/eccd465eb731e70edaacd23e462bcd0bf5a530"}, {"audio": 0, "start": 42941, "crunched": 0, "end": 46888, "filename": "/.git/objects/17/1078a72d62a1cee64e8f56d463cb4b919dd6ad"}, {"audio": 0, "start": 46888, "crunched": 0, "end": 47693, "filename": "/.git/objects/17/1ad7c45c789174ce813c32da111d62b95f56d0"}, {"audio": 0, "start": 47693, "crunched": 0, "end": 47816, "filename": "/.git/objects/19/ee46a67efa6719fe7c93796aa747d41d7d5d4f"}, {"audio": 0, "start": 47816, "crunched": 0, "end": 48143, "filename": "/.git/objects/1a/52bd06719f7ac3fe77f0295a702650f94ff5f5"}, {"audio": 0, "start": 48143, "crunched": 0, "end": 49356, "filename": "/.git/objects/1d/3e08e286d15687ec4ddd8d22f0fc5b44b26857"}, {"audio": 0, "start": 49356, "crunched": 0, "end": 51579, "filename": "/.git/objects/1d/be584173442a98cc102ad9b2bc96e8b38d054a"}, {"audio": 0, "start": 51579, "crunched": 0, "end": 52184, "filename": "/.git/objects/1f/158184b68a6a57a697e8b4ee072229f6a8b2ca"}, {"audio": 0, "start": 52184, "crunched": 0, "end": 52347, "filename": "/.git/objects/28/75b578851c58a5ed7db06cfb29a2bd57738657"}, {"audio": 0, "start": 52347, "crunched": 0, "end": 52656, "filename": "/.git/objects/2a/70859a0d3992f80312a70e8da2eda10e5afbe4"}, {"audio": 0, "start": 52656, "crunched": 0, "end": 52892, "filename": "/.git/objects/2a/89d6a16e7576f963c0fc14f9b92786d1f8d71b"}, {"audio": 0, "start": 52892, "crunched": 0, "end": 53009, "filename": "/.git/objects/2b/351faf8ef721a793d3d630224e76a391ceeab8"}, {"audio": 0, "start": 53009, "crunched": 0, "end": 61956, "filename": "/.git/objects/2c/15ba3ec2a3a681c7779077d3699e03340e5fc4"}, {"audio": 0, "start": 61956, "crunched": 0, "end": 64600, "filename": "/.git/objects/2c/7ae018b3c4fa4f88ed259ebca81b9fdbee39a2"}, {"audio": 0, "start": 64600, "crunched": 0, "end": 65146, "filename": "/.git/objects/2e/51dc073ec9112d67f6a9853511377d077a0b92"}, {"audio": 0, "start": 65146, "crunched": 0, "end": 65319, "filename": "/.git/objects/35/2cb141d8fde4279fbf573f8bc082d5bd698296"}, {"audio": 0, "start": 65319, "crunched": 0, "end": 67633, "filename": "/.git/objects/3c/f68750bc6891a173166cddebeb0ff8147eb663"}, {"audio": 0, "start": 67633, "crunched": 0, "end": 67957, "filename": "/.git/objects/3e/ce3af5674948da854e974a3d2ec45beadc0a11"}, {"audio": 0, "start": 67957, "crunched": 0, "end": 68287, "filename": "/.git/objects/49/5006784561074cc990ae96fd1118fd1339dda6"}, {"audio": 0, "start": 68287, "crunched": 0, "end": 68917, "filename": "/.git/objects/4a/143db5ed2acc9cc75b1d99ec90088bff66237a"}, {"audio": 0, "start": 68917, "crunched": 0, "end": 71266, "filename": "/.git/objects/4b/4f7a4a7e26ec442c85e2ad2de1abecc22ab83e"}, {"audio": 0, "start": 71266, "crunched": 0, "end": 71382, "filename": "/.git/objects/4b/a17b7fd0df9e7d5e05643fcfacec248baab1a1"}, {"audio": 0, "start": 71382, "crunched": 0, "end": 72577, "filename": "/.git/objects/4e/2f002d25ad22e66b673c9c1e028ae5c9a35b4c"}, {"audio": 0, "start": 72577, "crunched": 0, "end": 72941, "filename": "/.git/objects/50/8ee9a25463b4792f066653402f1c42c85f8e09"}, {"audio": 0, "start": 72941, "crunched": 0, "end": 73582, "filename": "/.git/objects/52/7b5003485c3ae0e7b6a0f5835c368584813b62"}, {"audio": 0, "start": 73582, "crunched": 0, "end": 73798, "filename": "/.git/objects/54/57c843ebff598261b2be02b3218ec6f7154c09"}, {"audio": 0, "start": 73798, "crunched": 0, "end": 73954, "filename": "/.git/objects/56/e4f5b518119510f3c1475c2f8e9b8987899e55"}, {"audio": 0, "start": 73954, "crunched": 0, "end": 84069, "filename": "/.git/objects/58/40171e37402a8dd522c9b2ea1ef65a397979ee"}, {"audio": 0, "start": 84069, "crunched": 0, "end": 84235, "filename": "/.git/objects/60/39943f9186338eb1ed6409257b0109f9627070"}, {"audio": 0, "start": 84235, "crunched": 0, "end": 85216, "filename": "/.git/objects/66/a59e4601dd4e89b0cd4f1c9228e85e269bbc1f"}, {"audio": 0, "start": 85216, "crunched": 0, "end": 95824, "filename": "/.git/objects/69/9f2b87589ad13b390e31fd09cd77b80e9c0ad1"}, {"audio": 0, "start": 95824, "crunched": 0, "end": 95989, "filename": "/.git/objects/75/d94c7f150111fe37efed2e6f0deda5c0f81915"}, {"audio": 0, "start": 95989, "crunched": 0, "end": 97208, "filename": "/.git/objects/76/490c5ee5ea533ad0471cdabcfbca41e7cb3396"}, {"audio": 0, "start": 97208, "crunched": 0, "end": 97736, "filename": "/.git/objects/85/976f6723e90d74b87ffd7037cd49a7772837d4"}, {"audio": 0, "start": 97736, "crunched": 0, "end": 98270, "filename": "/.git/objects/89/434afacedb505dfcc9587bc91984bd26009dfc"}, {"audio": 0, "start": 98270, "crunched": 0, "end": 98783, "filename": "/.git/objects/8d/2c49d931ee58fff01c0ebcbb1867674ddc3666"}, {"audio": 0, "start": 98783, "crunched": 0, "end": 100168, "filename": "/.git/objects/8f/e89e85682a45b24aa418c9b1ae0a4beab65f19"}, {"audio": 0, "start": 100168, "crunched": 0, "end": 100299, "filename": "/.git/objects/95/b5ed3549d016902783ad717edda98fe020b9ca"}, {"audio": 0, "start": 100299, "crunched": 0, "end": 100744, "filename": "/.git/objects/a0/4427c70a1047cb80cb8bb231bb0e6e9d6cff4e"}, {"audio": 0, "start": 100744, "crunched": 0, "end": 102024, "filename": "/.git/objects/a3/54c9943309635d75c5995879d71406b1a717f4"}, {"audio": 0, "start": 102024, "crunched": 0, "end": 102639, "filename": "/.git/objects/a7/4e855a0e1d70377c46c377d4ee0f30349de442"}, {"audio": 0, "start": 102639, "crunched": 0, "end": 102717, "filename": "/.git/objects/a8/17b884bf722c1ad8ee9b70993b75466ef8980a"}, {"audio": 0, "start": 102717, "crunched": 0, "end": 103292, "filename": "/.git/objects/b0/1894c33a86a9abca65a9e3da03577f01c21461"}, {"audio": 0, "start": 103292, "crunched": 0, "end": 148978, "filename": "/.git/objects/b1/9aa7b9d5a928d08642b76c36b30160389af29c"}, {"audio": 0, "start": 148978, "crunched": 0, "end": 149509, "filename": "/.git/objects/b4/34848cdede0692e6f34992482e123ff4424368"}, {"audio": 0, "start": 149509, "crunched": 0, "end": 149599, "filename": "/.git/objects/b8/dbf5237bf2175f96be2cb54f1faf290691620e"}, {"audio": 0, "start": 149599, "crunched": 0, "end": 150019, "filename": "/.git/objects/c6/bbbc3bab752c04703a30bc939f4210dac433ca"}, {"audio": 0, "start": 150019, "crunched": 0, "end": 150228, "filename": "/.git/objects/c7/b594bd2dd3ddfa2f84e9cf0e0fccb12c844e97"}, {"audio": 0, "start": 150228, "crunched": 0, "end": 152744, "filename": "/.git/objects/c8/1a43cdf1a77a4c431d11b8c9d468d498b6ceb7"}, {"audio": 0, "start": 152744, "crunched": 0, "end": 153107, "filename": "/.git/objects/c9/974ec046cc14e63e8119b2b4b67208733bfce8"}, {"audio": 0, "start": 153107, "crunched": 0, "end": 153532, "filename": "/.git/objects/d3/b7cc8a5331112d06b0667a45034d003a09d6b0"}, {"audio": 0, "start": 153532, "crunched": 0, "end": 153896, "filename": "/.git/objects/dc/e23b993a893e97edbe7689abd6c9671a9e76e5"}, {"audio": 0, "start": 153896, "crunched": 0, "end": 234449, "filename": "/.git/objects/df/80c85aea0baade82ad55463bf4e5c31a196a4b"}, {"audio": 0, "start": 234449, "crunched": 0, "end": 234948, "filename": "/.git/objects/e4/e0948719f767fa0e7bac9569994471373d2322"}, {"audio": 0, "start": 234948, "crunched": 0, "end": 236860, "filename": "/.git/objects/e4/e45bf2fb60b3943e2af13ba1273d2c362ea998"}, {"audio": 0, "start": 236860, "crunched": 0, "end": 237223, "filename": "/.git/objects/e6/4090c6c18980790d9b43cc5d02b6c2f6f8c88a"}, {"audio": 0, "start": 237223, "crunched": 0, "end": 237238, "filename": "/.git/objects/e6/9de29bb2d1d6434b8b29ae775ad8c2e48c5391"}, {"audio": 0, "start": 237238, "crunched": 0, "end": 239752, "filename": "/.git/objects/e6/e820d347b6a07af71de853a70e237969e5a3c4"}, {"audio": 0, "start": 239752, "crunched": 0, "end": 240260, "filename": "/.git/objects/e7/198ab0391044bc11eac3172c9b34bf26526b73"}, {"audio": 0, "start": 240260, "crunched": 0, "end": 240760, "filename": "/.git/objects/ed/f5268d0d3ec396acfdc3442c65fe939071104c"}, {"audio": 0, "start": 240760, "crunched": 0, "end": 245163, "filename": "/.git/objects/fa/e77ef83769d220da2e1585ef9ed43a751fdd48"}, {"audio": 0, "start": 245163, "crunched": 0, "end": 245324, "filename": "/.git/objects/fb/26a202b1ba57b9b6c6b7da9a126fc9795fc6df"}, {"audio": 0, "start": 245324, "crunched": 0, "end": 245643, "filename": "/.git/objects/fe/43b93ec1474b18bb2b203fb9dc11aad62a2a5d"}, {"audio": 0, "start": 245643, "crunched": 0, "end": 245833, "filename": "/.git/objects/ff/7e66a4da09e15cd937d23ae3ccb227b2e17778"}, {"audio": 0, "start": 245833, "crunched": 0, "end": 245874, "filename": "/.git/refs/heads/master"}, {"audio": 0, "start": 245874, "crunched": 0, "end": 245906, "filename": "/.git/refs/remotes/origin/HEAD"}, {"audio": 0, "start": 245906, "crunched": 0, "end": 245947, "filename": "/.git/refs/remotes/origin/master"}, {"audio": 0, "start": 245947, "crunched": 0, "end": 274115, "filename": "/fonts/Munro.ttf"}, {"audio": 0, "start": 274115, "crunched": 0, "end": 301799, "filename": "/fonts/MunroNarrow.ttf"}, {"audio": 0, "start": 301799, "crunched": 0, "end": 329099, "filename": "/fonts/MunroSmall.ttf"}, {"audio": 0, "start": 329099, "crunched": 0, "end": 329607, "filename": "/img/characters/barackobama.png"}, {"audio": 0, "start": 329607, "crunched": 0, "end": 330121, "filename": "/img/characters/billclinton.png"}, {"audio": 0, "start": 330121, "crunched": 0, "end": 330632, "filename": "/img/characters/davidcameron.png"}, {"audio": 0, "start": 330632, "crunched": 0, "end": 331158, "filename": "/img/characters/hillaryclinton.png"}, {"audio": 0, "start": 331158, "crunched": 0, "end": 331646, "filename": "/img/characters/lizardperson.png"}, {"audio": 0, "start": 331646, "crunched": 0, "end": 332256, "filename": "/img/characters/queenelizabeth.png"}, {"audio": 0, "start": 332256, "crunched": 0, "end": 332811, "filename": "/img/characters/queensguard.png"}, {"audio": 0, "start": 332811, "crunched": 0, "end": 333304, "filename": "/img/characters/secretagent.png"}, {"audio": 0, "start": 333304, "crunched": 0, "end": 333784, "filename": "/img/characters/secretagent2.png"}, {"audio": 0, "start": 333784, "crunched": 0, "end": 337063, "filename": "/img/ui/background.png"}, {"audio": 0, "start": 337063, "crunched": 0, "end": 337658, "filename": "/img/ui/btn_capture.png"}, {"audio": 0, "start": 337658, "crunched": 0, "end": 338243, "filename": "/img/ui/btn_capture_hover.png"}, {"audio": 0, "start": 338243, "crunched": 0, "end": 338547, "filename": "/img/ui/btn_place_marker.png"}, {"audio": 0, "start": 338547, "crunched": 0, "end": 338846, "filename": "/img/ui/btn_place_marker_hover.png"}, {"audio": 0, "start": 338846, "crunched": 0, "end": 339251, "filename": "/img/ui/btn_vis.png"}, {"audio": 0, "start": 339251, "crunched": 0, "end": 339651, "filename": "/img/ui/btn_vis_toggle.png"}, {"audio": 0, "start": 339651, "crunched": 0, "end": 339948, "filename": "/img/ui/bubble.png"}, {"audio": 0, "start": 339948, "crunched": 0, "end": 342301, "filename": "/img/ui/gameover.png"}, {"audio": 0, "start": 342301, "crunched": 0, "end": 344585, "filename": "/img/ui/gamewin.png"}, {"audio": 0, "start": 344585, "crunched": 0, "end": 344696, "filename": "/img/ui/marker_0.png"}, {"audio": 0, "start": 344696, "crunched": 0, "end": 344889, "filename": "/img/ui/marker_1.png"}, {"audio": 0, "start": 344889, "crunched": 0, "end": 345063, "filename": "/img/ui/marker_2.png"}, {"audio": 0, "start": 345063, "crunched": 0, "end": 345282, "filename": "/img/ui/particle.png"}, {"audio": 1, "start": 345282, "crunched": 0, "end": 355832, "filename": "/sounds/beep.wav"}, {"audio": 1, "start": 355832, "crunched": 0, "end": 366382, "filename": "/sounds/beep2.wav"}, {"audio": 1, "start": 366382, "crunched": 0, "end": 379118, "filename": "/sounds/hit.wav"}, {"audio": 1, "start": 379118, "crunched": 0, "end": 435462, "filename": "/sounds/switch.wav"}, {"audio": 1, "start": 435462, "crunched": 0, "end": 554160, "filename": "/sounds/transform.wav"}], "remote_package_size": 554160, "package_uuid": "d35d240f-8d8a-4a6a-bf41-5a1a7ce7cfb5"});

})();
