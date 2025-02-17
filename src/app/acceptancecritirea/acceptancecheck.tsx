// src/components/AcceptanceCriteriaChecklist/AcceptanceCriteriaChecklist.tsx
import React from "react";
import { motion } from "framer-motion";
import styles from "./AcceptanceCriteriaChecklist.module.css";

interface CriteriaType {
  id: number;
  label: string;
  description: string;
}

const acceptanceCriteriaList: CriteriaType[] = [
  { id: 1, label: "Product has a description", description: "The product must have a detailed description." },
  { id: 2, label: "Product has a price", description: "The product must display its price." },
  { id: 3, label: "Product has images", description: "The product must have at least one image." },
  { id: 4, label: "Product has discount", description: "The product must show a discount if applicable." },
  { id: 5, label: "Product has criteria met", description: "The product must indicate which criteria are met." },
];

const Accordion = ({ criteria, isMet }: { criteria: CriteriaType; isMet: boolean }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={styles.accordion}>
      <motion.div
        className={styles.accordionHeader}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
      >
        <h3>{criteria.label} - {isMet ? "✅ Met" : "❌ Not Met"}</h3>
      </motion.div>
      {isOpen && (
        <motion.div
          className={styles.accordionContent}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <p>{criteria.description}</p>
        </motion.div>
      )}
    </div>
  );
};

const AcceptanceCriteriaChecklist = ({ criteriaMet }: { criteriaMet: number[] }) => {
  return (
    <div className={styles.checklist}>
      <h2>Acceptance Criteria Check</h2>
      <div className={styles.expandInstruction}>
        <strong>Click to Expand</strong>
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none" 
          className={styles.expandIcon}
        >
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      {acceptanceCriteriaList.map(criteria => (
        <Accordion key={criteria.id} criteria={criteria} isMet={criteriaMet.includes(criteria.id)} />
      ))}
    </div>
  );
};

export default AcceptanceCriteriaChecklist;