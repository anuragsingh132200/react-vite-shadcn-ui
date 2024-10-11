
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ChevronRight, Warehouse, FolderTree, Package2 } from 'lucide-react'
import { Godown, Item } from '../utils/types'

const treeVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto' }
}

interface TreeNodeProps {
  node: Godown
  onSelectItem: (item: Item) => void
  level: number
}

export const TreeNode: React.FC<TreeNodeProps> = ({ node, onSelectItem, level }) => {
    const [isOpen, setIsOpen] = useState(false)

    const hasChildren = node.children && node.children.length > 0
    const hasItems = node.items && node.items.length > 0
  
    const getIcon = () => {
      if (level === 0) return <Warehouse className="h-4 w-4 mr-2 flex-shrink-0" />
      if (hasChildren || hasItems) return <FolderTree className="h-4 w-4 mr-2 flex-shrink-0" />
      return <Package2 className="h-4 w-4 mr-2 flex-shrink-0" />
    }
  
    const toggleOpen = () => {
      if (hasChildren || hasItems) {
        setIsOpen(!isOpen)
      }
    }
  
    return (
      <motion.div
        className="ml-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
      >
        <div className="flex items-center cursor-pointer" onClick={toggleOpen}>
          {(hasChildren || hasItems) && (
            <Button variant="ghost" size="icon" className="w-6 h-6 flex-shrink-0">
              <motion.div
                initial={false}
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="h-4 w-4" />
              </motion.div>
            </Button>
          )}
          {getIcon()}
          <span className="ml-2 truncate">{node.name}</span>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={treeVariants}
              transition={{ duration: 0.2 }}
            >
              {hasChildren &&
                node.children!.map((child) => (
                  <TreeNode key={child.id} node={child} onSelectItem={onSelectItem} level={level + 1} />
                ))}
              {hasItems &&
                node.items!.map((item) => (
                  <motion.div
                    key={item.item_id}
                    className="ml-8 flex items-center cursor-pointer hover:text-blue-500 dark:hover:text-blue-400"
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectItem(item)
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Package2 className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </motion.div>
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
}
