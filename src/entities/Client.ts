import { Entity, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany } from 'typeorm';
import { Banker } from './Banker';
import { Transaction } from './Transaction';
import { Person } from './utils/Person';

@Entity('client')
export class Client extends Person {
    @Column({
        type: 'numeric',
    })
    balance: number;

    @Column({
        default: true,
        name: 'active',
    })
    is_active: boolean;

    @Column({
        type: 'simple-json',
        nullable: true,
    })
    additional_info: {
        age: number;
        credit_score: number;
        is_risk: boolean;
    };

    @Column({
        type: 'simple-array',
        default: [],
    })
    authorized_users: string[];

    @OneToMany(() => Transaction, (transaction) => transaction.client, {
        cascade: true,
      onUpdate: 'CASCADE'
    })
    transactions: Transaction[];

    @ManyToMany(() => Banker, { cascade: true })
    bankers: Banker[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
