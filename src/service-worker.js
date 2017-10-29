(function () {

/**
 * Check out https://googlechromelabs.github.io/sw-toolbox/ for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */


  'use strict';
  importScripts('./build/sw-toolbox.js');
  importScripts("https://cdn.rawgit.com/mozilla/localForage/master/dist/localforage.js")
  ;

  const STATIC_CACHE_NAME = 'devfestcache';

  const FILES_TO_INDEXEDDB = [
    'sessions.json',
    'speakers.json',
    'schedule.json'
  ];

  self.toolbox.options.cache = {
    name: STATIC_CACHE_NAME
  };

  // pre-cache our key assets
  self.toolbox.precache(
    [
      './build/main.js',
      './build/vendor.js',
      './build/main.css',
      './build/polyfills.js',
      'index.html',
      'manifest.json'
    ]
  );

  self.addEventListener('install', (event) => {
    console.log('Installation du Service Worker...');
  });

  self.addEventListener('activate', (event) => {
    console.log('Activating new service worker...');
  });

  self.addEventListener('fetch', event => {
      console.log('Fetching:', event.request.url);
      event.respondWith(
        caches.match(event.request).then((response) => {
        const lastUrlPart = event.request.url.split('/')[event.request.url.split('/').length-1];

        if (response) {
          console.log(event.request.url, 'servi depuis le cache');
          return response;
        } else if(FILES_TO_INDEXEDDB.includes(lastUrlPart)){

          localforage.getItem(lastUrlPart).then(function(value) {
            // This code runs once the value has been loaded
            // from the offline store.
            console.log('Servi depuis le localforage ' + event.request.url, lastUrlPart, value);
            return value;
          }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
          });
        }


        return fetch(event.request).then(function(resp) {
          console.log(event.request.url, lastUrlPart, 'servi depuis le réseau');
          if (FILES_TO_INDEXEDDB.includes(lastUrlPart)) {
            var responseClone = resp.clone();
            responseClone.json().then(data => {
              localforage.setItem(lastUrlPart, data);
          });
          }
          return resp;
        });
      })
  )})

  self.addEventListener('message', event => {
    console.log('Refresh all data from the service worker',event.data);
    for(let urlToFetch of event.data.message){
      const lastUrlPart = urlToFetch.split('/')[urlToFetch.split('/').length-1];
      console.log(urlToFetch,lastUrlPart);
      fetch(urlToFetch).then(function(resp) {
        console.log(urlToFetch, 'servi depuis le réseau');
        var responseClone = resp.clone();
        responseClone.json().then(data => {
          localforage.setItem(lastUrlPart, data);
        });
      });
    }
  });

  // dynamically cache any other local assets
  self.toolbox.router.any('/*', self.toolbox.fastest);

  // for any other requests go to the network, cache,
  // and then only use that cached resource if your user goes offline
  self.toolbox.router.default = self.toolbox.networkFirst;

  self.skipWaiting();



})();
