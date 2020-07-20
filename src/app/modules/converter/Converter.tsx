import React from "react";
import { Button, Input } from "antd";
import { PageContainer } from "../../02.components/PageContainer";
import { convert } from "../../04.utils/draftjs-converter/01.converter";

export const Converter: React.FunctionComponent = () => {
  const [json, setJson] = React.useState<string>(`{
    "blocks" : [
      {
        "entityRanges" : [ ],
        "inlineStyleRanges" : [ ],
        "depth" : 0,
        "type" : "header-two",
        "text" : "This is a Title",
        "key" : "e3fag"
      },
      {
        "entityRanges" : [ ],
        "inlineStyleRanges" : [
          {
            "style" : "BOLD",
            "length" : 4,
            "offset" : 53
          },
          {
            "style" : "ITALIC",
            "length" : 6,
            "offset" : 59
          },
          {
            "style" : "UNDERLINE",
            "length" : 9,
            "offset" : 71
          }
        ],
        "depth" : 0,
        "type" : "unstyled",
        "text" : "This is a paragraph, with some inline styles such as bold, italic, and underline.",
        "key" : "etd8o"
      },
      {
        "entityRanges" : [ ],
        "inlineStyleRanges" : [
          {
            "style" : "BOLD",
            "length" : 15,
            "offset" : 31
          },
          {
            "style" : "BOLD",
            "length" : 27,
            "offset" : 48
          },
          {
            "style" : "ITALIC",
            "length" : 15,
            "offset" : 31
          },
          {
            "style" : "ITALIC",
            "length" : 27,
            "offset" : 48
          },
          {
            "style" : "UNDERLINE",
            "length" : 27,
            "offset" : 48
          }
        ],
        "depth" : 0,
        "type" : "unstyled",
        "text" : "Styles can overlap, like this: bold and italic, bold, italic, and underline.",
        "key" : "750vk"
      },
      {
        "entityRanges" : [ ],
        "inlineStyleRanges" : [
          {
            "style" : "UNDERLINE",
            "length" : 25,
            "offset" : 75
          },
          {
            "style" : "ITALIC",
            "length" : 15,
            "offset" : 80
          },
          {
            "style" : "BOLD",
            "length" : 5,
            "offset" : 85
          }
        ],
        "depth" : 0,
        "type" : "unstyled",
        "text" : "Style overlaps do not have to start or end at the same place, for example: one, two, three, two, one.",
        "key" : "abe9l"
      }
    ]
  }`);
  const [html, setHtml] = React.useState<string>("");

  return (
    <PageContainer title="Converter">
      <Button
        type="primary"
        onClick={() => {
          setHtml(convert(json));
        }}
        disabled={!json}
      >
        Convert
      </Button>
      <div style={{ display: "flex", marginTop: 10 }}>
        <Input.TextArea
          onChange={(e) => setJson(e.target.value || "")}
          value={json}
          autoSize={{
            minRows: 10,
          }}
        ></Input.TextArea>
        <div style={{ width: 20 }}></div>
        <Input.TextArea
          value={html}
          autoSize={{
            minRows: 10,
          }}
        ></Input.TextArea>
      </div>
    </PageContainer>
  );
};
