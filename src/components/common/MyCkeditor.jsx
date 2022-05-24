import React, { useState } from 'react'
import Editor from 'ckeditor5-custom-build/build/ckeditor'
import { CKEditor } from '@ckeditor/ckeditor5-react'


function MyCkeditor(props) {
  const [dataEdit, setDataEdit] = useState('')
  return (
    <>
      <CKEditor 
        editor={ Editor }
        data={dataEdit}
        onReady={editor => {
          console.log('editor is ready to use', editor)
        }}
        onChange={(event, editor) => {
          const data = editor.getData()
          console.log({event, data})
          setDataEdit(data)
        }}
      />
      <div
        dangerouslySetInnerHTML={{ __html: dataEdit }}
      >
      </div>
    </>

  )
}

MyCkeditor.propTypes = {}

export default MyCkeditor
