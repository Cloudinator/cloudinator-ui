import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BuildNumber } from "@/redux/api/projectApi";

interface RollbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRollback: (version: number) => void;
  builds: BuildNumber[];
}

export default function RollbackModal({
  isOpen,
  onClose,
  onRollback,
  builds,
}: RollbackModalProps) {
  const [selectedVersion, setSelectedVersion] = useState<string | undefined>(
    undefined,
  );

  const handleRollback = () => {
    if (selectedVersion) {
      onRollback(parseInt(selectedVersion, 10));
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-purple-500">
            Select Version for Rollback
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Select onValueChange={setSelectedVersion} value={selectedVersion}>
            <SelectTrigger>
              <SelectValue placeholder="Select a version" />
            </SelectTrigger>
            <SelectContent>
              {builds.map((build, index) => (
                <SelectItem
                  key={build.buildNumber}
                  value={build.buildNumber.toString()}
                >
                  Success Version {index + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleRollback}
            disabled={!selectedVersion}
            className="bg-purple-500 hover:bg-purple-700"
          >
            Rollback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
