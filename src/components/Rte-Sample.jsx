import React from 'react'
import { Editor } from '@tinymce/tinymce-react'

function RTE() {
  return (
    <Editor 
    initialValue='default'
    init={{
        
        branding : false ,
        height : 500 ,
        menubar : true ,
        plugins : [
            'advlist autolink lists image charmap print preview anchor',
            'searchreplace visualblock code fullscreen',
            'insertdatetime media table paste code help wordcount'
        ]
        ,
        toolbar : 
        'undo redo | formatselect | bold italic | backcolor | \ alignleft aligncenter alignjustify  | \ bulllist numlist outdent indent | removeformat help '

    }

    }
    />
    // <Editor/> bydefaut we get our rte but we have to pass some argument 
  )
}

export default RTE