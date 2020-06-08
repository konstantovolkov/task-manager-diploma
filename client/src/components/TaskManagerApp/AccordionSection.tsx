/** @jsx jsx */
import { jsx } from "theme-ui";
import React from "react";
import {
  AccordionItem,
  AccordionItemState,
  AccordionItemPanel
} from "react-accessible-accordion";
import { AccordionItemHeading } from "react-accessible-accordion/";
import { AccordionItemButton } from "react-accessible-accordion/";

export const AccordionSection: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <AccordionItem>
      <AccordionItemState>
        {({ expanded, disabled }) => (
          <React.Fragment>
            <AccordionItemHeading
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "sp",
                height: "36px",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "lightgrey",
                borderRadius: "3px",
                bg: "background",
                ":hover": {
                  cursor: "pointer"
                }
              }}
            >
              <AccordionItemButton
                sx={{
                  flexGrow: 1,
                  pl: 2,
                  display: "flex",
                  alignItems: "center",
                  outline: "none"
                }}
              >
                {title}
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>{children}</AccordionItemPanel>
          </React.Fragment>
        )}
      </AccordionItemState>
    </AccordionItem>
  );
};
