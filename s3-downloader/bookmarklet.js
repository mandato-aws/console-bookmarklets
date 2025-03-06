javascript: (() => {

function downloadS3(rowStart,rowEnd,delaySeconds=1){
  console.log("Downloading files... Row Start: "+ rowStart +"; Row End: "+ rowEnd +"; Seconds between downloads: "+delaySeconds);
  const checkboxes = document.querySelectorAll('div[class="s3-objects-view-container"] div[class^="awsui_content_"] input[type="checkbox"]');
  if( checkboxes ) {
    var rowNum = 0;
    var dlCount = 0;
    checkboxes.forEach(checkbox => {
      if( rowNum > 0 && rowNum >= rowStart && rowNum <= rowEnd) {
        const thisRow = rowNum;
        setTimeout(() => {
          console.log( 'Row: '+thisRow + "; id: "+checkbox.id );
          var Elem = document.getElementById( checkbox.id );
          if( Elem ) {
            Elem.click();
            document.getElementById('download-object-button').click();
            Elem.click();
          }
        }, dlCount * 1000 * delaySeconds );
        dlCount++;
      }
      rowNum++;
    });
  }
}

let confirmRes = confirm("BEFORE PROCEEDING, MAKE SURE NONE OF THE ROWS ARE CHECKED.\n\nNOTE: Folders will not be downloaded.\n\nTIP: Setup your browser to automatically download files before you continue.\n\nDO NOT NAVIGATE AWAY FROM THIS PAGE UNTIL DOWNLOADS FINISHED.");
if( confirmRes != true ) {
  return;
}

let secondsDelay = prompt("Seconds between downloads:", "1");
if( secondsDelay == null ) { return; }
const regex1 = /^(\d+)$/g;
let matches1 = regex1.exec(secondsDelay);
if( matches1 == null || matches1.length < 2 ) {
    alert('Seconds entered is invalid.');
    return;
}
secondsDelay = parseInt(secondsDelay);
let startRange = prompt("Enter the start row number (first row is 1).\nEnter a dash followed by another row number to specify a start-end range.\nThe next 50 rows are downloaded if no end range is specified.\n\nExamples:\n  1  downloads rows 1-50\n  101-160  downloads rows 101-160\n\nStart row number / start-end range:", "1");
if( startRange == null ) { return; }
if( secondsDelay < 1 )
  secondsDelay = 1;
let rowStart = 1;
let rowEnd = rowStart+50-1;
const regex2 = /^(\d+)(?:-(\d+))?$/g;
let matches2 = regex2.exec(startRange);
if( matches2 == null || matches2.length < 2 ) {
    alert('Row start number or start-end range is invalid.');
    return;
}

if( matches2.length == 3 && matches2[2] != null ) {
    rowStart = parseInt(matches2[1]);
    rowEnd = parseInt(matches2[2]);
    if( rowEnd < rowStart ) {
      alert('End row number must be greater than start row number.');
      return;
    }
} else {
    rowStart = parseInt(matches2[1]);
    rowEnd = rowStart+50-1;
}
downloadS3(rowStart,rowEnd,secondsDelay);
})();
  