function listdir(){
	// Check for the various File API support.
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		console.log("All the File APIs are supported." );
	} else {
	  alert('The File APIs are not fully supported in this browser.');
	}
}

function handleFileSelect(evt) {
	 // FileList object
    var files = evt.target.files;
	
    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                  '</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
  

  // document.getElementById('files').addEventListener('change', handleFileSelect, false);
}


