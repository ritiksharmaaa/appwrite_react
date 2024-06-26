import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
//  here you can use this editor via forward ref it work but we can us eit in another ways

//  control props came from controller of hooks form

function RTE({ name, control, label, defaultValue="" }) {
  // console.log("from rte ", defaultValue)
  return (
    <div className="w-full ">
      {label && <label className="inline-block mb-1 pl-1 ">{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
          apiKey='jz9n9t0itvz1ib6xq58ot5xnr1fwxgs60rig0uv1l1qhelu8'

            initialValue={defaultValue}
            init={{
              branding: false,
              height: 500,
              menubar: true,
              plugins: [
                "advlist autolink lists image charmap print preview anchor",
                "searchreplace visualblock code fullscreen",
                "insertdatetime media table paste code help wordcount anchor ",
              ],
              toolbar:
                "undo redo | formatselect | bold italic | backcolor |  alignleft aligncenter alignjustify  |  bulllist numlist outdent indent | removeformat help ",
                content_style : "body {font-family:Helvetica, Arial , sans-serif ; font-size:14px }"
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

export default RTE;
