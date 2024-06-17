import {FC} from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DownloadIcon from "@mui/icons-material/Download";
import Box, {BoxProps} from "@mui/material/Box";

export type CharacterPreviewActionsProps = BoxProps & {
    index: number;
    onEdit?: (id: number) => void;
    onExport?: (id: number) => void;
    onDelete?: (id: number) => void;
    onDuplicate?: (id: number) => void;
};

export const CharacterPreviewActions: FC<CharacterPreviewActionsProps> = ({
                                                                              index,
                                                                              onEdit,
                                                                              onExport,
                                                                              onDelete,
                                                                              onDuplicate,
                                                                              ...rest
                                                                          }) => {
    const handleEdit = () => onEdit?.(index);

    const handleExport = () => onExport?.(index);

    const handleDelete = () => onDelete?.(index);

    const handleDuplicate = () => onDuplicate?.(index);

    return (
        <Box {...rest} display="flex" justifyContent="center" gap={2}>
            <IconButton onClick={handleEdit} title="Click to edit">
                <EditIcon/>
            </IconButton>
            <IconButton onClick={handleExport} title="Click to export">
                <DownloadIcon/>
            </IconButton>
            <IconButton onClick={handleDuplicate} title="Click to copy">
                <FileCopyIcon/>
            </IconButton>
            <IconButton onClick={handleDelete} color="error" title="Click to remove">
                <DeleteIcon/>
            </IconButton>
        </Box>
    );
};
