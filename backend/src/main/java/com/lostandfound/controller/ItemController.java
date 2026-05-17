package com.lostandfound.controller;

import com.lostandfound.dto.ItemDTO;
import com.lostandfound.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class ItemController {

    @Autowired
    private ItemService itemService;

    // Get all items
    @GetMapping
    public ResponseEntity<List<ItemDTO>> getAllItems() {
        List<ItemDTO> items = itemService.getAllItems();
        return ResponseEntity.ok(items);
    }

    // Get item by ID
    @GetMapping("/{id}")
    public ResponseEntity<ItemDTO> getItemById(@PathVariable Long id) {
        try {
            ItemDTO item = itemService.getItemById(id);
            return ResponseEntity.ok(item);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Get items by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<ItemDTO>> getItemsByStatus(@PathVariable String status) {
        List<ItemDTO> items = itemService.getItemsByStatus(status);
        return ResponseEntity.ok(items);
    }

    // Get user items by email
    @GetMapping("/user/{email}")
    public ResponseEntity<List<ItemDTO>> getUserItems(@PathVariable String email) {
        List<ItemDTO> items = itemService.getUserItems(email);
        return ResponseEntity.ok(items);
    }

    // Get items by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<ItemDTO>> getItemsByCategory(@PathVariable String category) {
        List<ItemDTO> items = itemService.getItemsByCategory(category);
        return ResponseEntity.ok(items);
    }

    // Create new item
    @PostMapping
    public ResponseEntity<ItemDTO> createItem(@RequestBody ItemDTO itemDTO) {
        try {
            ItemDTO createdItem = itemService.createItem(itemDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdItem);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Update item
    @PutMapping("/{id}")
    public ResponseEntity<ItemDTO> updateItem(@PathVariable Long id, @RequestBody ItemDTO itemDTO) {
        try {
            ItemDTO updatedItem = itemService.updateItem(id, itemDTO);
            return ResponseEntity.ok(updatedItem);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Update item status
    @PatchMapping("/{id}/status")
    public ResponseEntity<ItemDTO> updateItemStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        try {
            String status = request.get("status");
            ItemDTO updatedItem = itemService.updateItemStatus(id, status);
            return ResponseEntity.ok(updatedItem);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete item
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable Long id) {
        try {
            itemService.deleteItem(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Item deleted successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Health check endpoint
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "Lost and Found Portal API");
        return ResponseEntity.ok(response);
    }
}
