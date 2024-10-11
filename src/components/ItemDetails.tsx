
import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Item } from '../utils/types'

interface ItemDetailsProps {
  selectedItem: Item;
}

export const ItemDetails: React.FC<ItemDetailsProps> = ({ selectedItem }) => {
  return (
    <Card className="dark:bg-gray-800 dark:text-white">
                  <CardHeader>
                    <CardTitle>{selectedItem.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <motion.img
                          src={selectedItem.image_url}
                          alt={selectedItem.name}
                          className="w-full h-auto rounded-lg max-h-[40vh] object-contain"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <div>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                          <strong>Category:</strong> {selectedItem.category}
                        </motion.p>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                          <strong>Brand:</strong> {selectedItem.brand}
                        </motion.p>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                          <strong>Price:</strong> ${selectedItem.price.toFixed(2)}
                        </motion.p>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                          <strong>Quantity:</strong> {selectedItem.quantity}
                        </motion.p>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                          <strong>Status:</strong> {selectedItem.status}
                        </motion.p>
                        <motion.h3 className="font-bold mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                          Attributes:
                        </motion.h3>
                        <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                          {Object.entries(selectedItem.attributes).map(([key, value], index) => (
                            <motion.li
                              key={key}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.8 + index * 0.1 }}
                            >
                              <strong>{key}:</strong> {String(value)}
                            </motion.li>
                          ))}
                        </motion.ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
  )
}
