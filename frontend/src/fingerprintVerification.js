import FingerprintJS from "@fingerprintjs/fingerprintjs";

const fpPromise = FingerprintJS.load();
fpPromise.then(fp => fp.get()).then(result =>{
    const visitorId = result.visitorId;
    console.log(visitorId);
})