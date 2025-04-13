"use client";

import { Button } from "@/components/ui/button";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type ProblemListHeaderButtonProps = {
    label: string;
    lucideIcon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    className?: string;
    variant?: "default" | "outline" | "link" | "destructive" | "secondary";
    onClick: () => void;
};

export function CardHeaderButton(props: ProblemListHeaderButtonProps) {
    return (
        <Button
            variant={props.variant || "default"}
            size="sm"
            onClick={props.onClick}
            className={props.className}
        >
            <props.lucideIcon className="h-4 w-4 mr-1" />
            <span>{props.label}</span>
        </Button>
    );
}
