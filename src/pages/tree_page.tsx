import  { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRightIcon, Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from 'framer-motion'
import { TreeNode } from '../components/TreeNode'
import { ItemDetails } from '../components/ItemDetails'
import { buildGodownTree } from '../utils/godownTree'
import { Godown, Item } from '../utils/types'
import items from "@/assets/items.json"
import godown from "@/assets/godowns.json"

const godowns: Godown[] = buildGodownTree(godown, items)

export default function TreePage() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className={`flex h-screen ${isDarkMode ? 'dark' : ''}`}>
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-50 w-full sm:w-auto"
          >
            <div className="h-full bg-white dark:bg-gray-800 shadow-lg sm:w-80">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-2xl font-bold">Godown Inventory</h2>
                <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                  <ChevronLeft />
                </Button>
              </div>
              <div className="h-full p-4 overflow-auto">
                {godowns.map((godown) => (
                  <TreeNode key={godown.id} node={godown} onSelectItem={setSelectedItem} level={0} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-900">
          <Button variant="outline" size="icon" onClick={toggleSidebar}>
            <ChevronRightIcon />
          </Button>
          
          <Button variant="outline" size="icon" onClick={toggleTheme}>
            {isDarkMode ? <Sun /> : <Moon />}
          </Button>
        </div>
        <div className="flex-1 p-4 overflow-auto dark:bg-gray-900 dark:text-white">
          <AnimatePresence mode="wait">
            {selectedItem ? (
              <ItemDetails selectedItem={selectedItem} />
            ) : (
              <motion.div
                className="flex items-center justify-center h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-gray-500 dark:text-gray-400">Select an item to view details</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}