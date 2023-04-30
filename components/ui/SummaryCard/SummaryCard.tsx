import React from 'react';
import styles from './SummaryCard.module.css';
import { SummaryCard } from '@/types';

const SummaryCard = ({ name, amount }: SummaryCard) => {
  return (
    <div className={styles.card}>
      <p className="pb-2  text-black">{name}</p>
      <h2 className="text-4xl  text-black">{amount}</h2>
    </div>
  );
};

export default SummaryCard;
